FROM php:8.4-cli

# Install system dependencies needed for Laravel + SQLite + common PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libsqlite3-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install zip pdo_sqlite mbstring xml \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Make sure SQLite file exists before Laravel scripts run
RUN touch database/database.sqlite

# Install PHP dependencies
RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]