# Spotify Music Playlist

A Spotify-inspired music playlist web application built with Next.js, React, and PostgreSQL.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide Icons
- **State Management:** TanStack React Query
- **Database:** PostgreSQL 15
- **ORM:** Prisma 7 (with PrismaPg driver adapter)
- **Notifications:** Sonner

## Features

- Create, edit, and delete playlists
- Search and add songs to playlists
- Remove songs from playlists
- Toggle playlist public/private visibility
- Edit playlist details (name, description) via modal
- Inline search to filter songs within a playlist
- Right-click context menu on song rows
- Playlist cover grid generated from song artwork
- Responsive design (mobile sidebar overlay, adaptive table columns)
- Toast notifications for all actions

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (for PostgreSQL)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd music-playlist-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

Default `.env`:

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/music_db"
```

### 4. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL 15 container on port `5432`.

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Generate Prisma client

```bash
npx prisma generate
```

### 7. Seed the database

```bash
npx prisma db seed
```

This seeds the database with 10 songs and 3 playlists.

### 8. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  api/
    playlists/            # Playlist CRUD endpoints
      [id]/
        route.ts          # GET, PATCH, DELETE playlist
        songs/
          route.ts        # POST, DELETE songs in playlist
      route.ts            # GET all, POST create playlist
    songs/
      search/
        route.ts          # GET search songs
  layout.tsx              # Root layout with providers
  page.tsx                # Main page component
components/
  atoms/                  # Small reusable components
    CoverImage.tsx
    PlaylistCover.tsx
    PlaylistItem.tsx
    MenuCard.tsx
  molecules/              # Composite components
    EditPlaylistModal.tsx
    FindSongs.tsx
    PlaylistHeader.tsx
    PlaylistTable.tsx
    Sidebar.tsx
    SidebarHeader.tsx
  providers/
    QueryProvider.tsx      # TanStack React Query provider
  ui/                     # shadcn/ui components
services/
  playlists.ts            # Playlist API service layer
  songs.ts                # Song search API service
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Database seed data
  migrations/             # Migration files
lib/
  prisma.ts               # Prisma client singleton
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma db seed` | Seed the database |
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
