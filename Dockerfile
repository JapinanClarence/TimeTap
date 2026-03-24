# ============================================================
# Stage 1: Node — build Vite/React assets
# ============================================================
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_ vars are statically inlined into the JS bundle by Vite at build time.
# They MUST exist in .env before `npm run build` runs — container environment
# variables are NOT read by Vite during build, only .env files are.
ARG APP_NAME=timetap
ARG VITE_APP_NAME=${APP_NAME}
ARG VITE_CLOUDINARY_CLOUD_NAME=
ARG VITE_CLOUDINARY_PRESET=

RUN echo "APP_URL=http://localhost" > .env \
    && echo "APP_NAME=${APP_NAME}" >> .env \
    && echo "VITE_APP_NAME=${VITE_APP_NAME}" >> .env \
    && echo "VITE_CLOUDINARY_CLOUD_NAME=${VITE_CLOUDINARY_CLOUD_NAME}" >> .env \
    && echo "VITE_CLOUDINARY_PRESET=${VITE_CLOUDINARY_PRESET}" >> .env \
    && echo "=== .env written for Vite build ===" && cat .env

# Run build — full output visible in build log
RUN npm run build || (echo "=== npm run build FAILED ===" && exit 1)

# Show exactly what was produced
RUN echo "=== public/build contents ===" \
    && find /app/public/build -type f 2>/dev/null || echo "(nothing found)"

# ============================================================
# Stage 2: PHP — production Laravel image
# ============================================================
FROM php:8.3-fpm-alpine AS php-base

# System dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    zip \
    unzip \
    git \
    oniguruma-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files first for layer caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy application source
COPY . .

# Copy Aiven CA cert — fail the build early if it's missing
COPY docker/certs/ca.pem /var/www/html/docker/certs/ca.pem
RUN test -f /var/www/html/docker/certs/ca.pem \
    || (echo "ERROR: docker/certs/ca.pem not found. Download it from Aiven console." && exit 1) \
    && chmod 644 /var/www/html/docker/certs/ca.pem

# Copy built frontend assets from node stage
COPY --from=node-builder /app/public/build ./public/build

# Finish composer install
RUN composer dump-autoload --optimize --classmap-authoritative \
    && composer run-script post-autoload-dump || true

# Set permissions
# 775 on storage/cache so www-data group can always write,
# even when docker compose watch syncs files owned by the host user.
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Copy config files
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]