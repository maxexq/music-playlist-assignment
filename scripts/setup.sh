#!/bin/bash

echo "=== TAKE-HOME PROJECTS Spotify Music Playlist - Setup ==="
echo ""

echo "1. Installing dependencies..."
npm install

echo ""
echo "2. Setting up environment variables..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "   Created .env from .env.example"
else
  echo "   .env already exists, skipping"
fi

echo ""
echo "3. Starting Docker containers..."
docker compose up -d

echo ""
echo "4. Waiting for PostgreSQL to be ready..."
until docker compose exec db pg_isready -U myuser -d music_db > /dev/null 2>&1; do
  sleep 1
done
echo "   PostgreSQL is ready."

echo ""
echo "5. Running Prisma migrations..."
npx prisma migrate dev --name init --skip-generate 2>/dev/null || npx prisma migrate dev

echo ""
echo "6. Generating Prisma client..."
npx prisma generate

echo ""
echo "7. Seeding database..."
npx prisma db seed

echo ""
echo "=== Setup complete! ==="
echo ""
echo "Run 'npm run dev' to start the development server."
echo "Open http://localhost:3000 in your browser."
