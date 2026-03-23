#!/bin/sh
set -e

echo "🚀 Starting Laravel entrypoint..."

cd /var/www/html

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    echo "⚠️  APP_KEY not set, generating..."
    php artisan key:generate --force
fi

# Cache config/routes/views for production
if [ "$APP_ENV" = "production" ]; then
    echo "📦 Caching config, routes and views..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

# Run migrations (safe with --force in production)
echo "🗄️  Running migrations..."
php artisan migrate --force --no-interaction

# Clear stale caches on boot (useful after deploys)
php artisan cache:clear || true

echo "✅ Laravel ready!"

exec "$@"
