# Use a PHP image that includes a web server (Apache)
FROM php:8.2-apache

# Install system dependencies for Laravel & GD for QR codes
RUN apt-get update && apt-get install -y \
    libpng-dev libzip-dev zip unzip git curl \
    && docker-php-ext-install pdo_mysql gd zip \
    && a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# IMPORTANT: Tell Apache to listen to the port Render gives us
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# We no longer EXPOSE 9000. 
# Render will automatically find the port Apache is using.
CMD ["apache2-foreground"]