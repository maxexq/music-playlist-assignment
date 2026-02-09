#!/bin/bash

echo "Starting database setup..."

echo "1. Starting Docker containers..."
docker compose up -d

echo "2. Waiting for PostgreSQL to be ready..."
until docker compose exec db pg_isready -U myuser -d music_db > /dev/null 2>&1; do
  sleep 1
done
echo "   PostgreSQL is ready."

echo "3. Running Prisma migrations..."
npx prisma migrate dev --name init --skip-generate 2>/dev/null || npx prisma migrate dev

echo "4. Generating Prisma client..."
npx prisma generate

echo "5. Seeding database..."
npx prisma db seed

echo "Database setup complete!"
