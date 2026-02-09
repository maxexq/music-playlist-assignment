# Spotify Music Playlist

A take-home project — a Spotify-inspired music playlist web application built with Next.js, React, and PostgreSQL.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide Icons
- **State Management:** TanStack React Query
- **Database:** PostgreSQL 15
- **ORM:** Prisma 7 (with PrismaPg driver adapter)
- **Notifications:** Sonner
- **Containerization:** Docker Compose

## Features

### Playlist Management
- Create new playlists (auto-named "My Playlist #N")
- Edit playlist details (name, description) via modal dialog
- Delete playlists from the dropdown menu
- Toggle playlist public/private visibility
- Playlist label reflects public/private status

### Songs
- Search songs from the database with debounced input
- Add songs to playlists (with duplicate detection — shows "Already in your playlist")
- Remove songs from playlists
- Add songs to other playlists via dropdown or right-click context menu
- Toast notification shows destination playlist name (e.g. "Added to My Playlist #3")

### UI/UX
- Spotify-dark themed interface
- Playlist cover grid auto-generated from song artwork (1/2x2/3+1/4 grid layout)
- Inline sliding search bar to filter songs within a playlist
- Right-click context menu on song rows
- Responsive design — mobile sidebar overlay, adaptive table columns, full-width mobile search
- Toast notifications for all success/error actions

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) and Docker Compose

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

```bash
cp .env.example .env
```

Default `.env`:

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/music_db"
```

### 4. Quick Setup (recommended)

Run the full database setup in one command:

```bash
npm run db:setup
```

This will:
1. Start the PostgreSQL Docker container
2. Wait for the database to be ready
3. Run Prisma migrations
4. Generate the Prisma client
5. Seed the database with 10 songs and 3 playlists

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Manual Setup (alternative)

If you prefer to run each step individually:

```bash
docker compose up -d       # Start PostgreSQL
npm run db:migrate         # Run migrations
npm run db:generate        # Generate Prisma client
npm run db:seed            # Seed the database
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/playlists` | List all playlists with song counts and cover images |
| `POST` | `/api/playlists` | Create a new playlist |
| `GET` | `/api/playlists/[id]` | Get playlist details with songs |
| `PATCH` | `/api/playlists/[id]` | Update playlist (name, description, isPublic) |
| `DELETE` | `/api/playlists/[id]` | Delete a playlist |
| `POST` | `/api/playlists/[id]/songs` | Add a song to a playlist (409 if duplicate) |
| `DELETE` | `/api/playlists/[id]/songs` | Remove a song from a playlist |
| `GET` | `/api/songs/search?q=query` | Search songs by title or artist |

## Project Structure

```
app/
  api/
    playlists/
      [id]/
        route.ts              # GET, PATCH, DELETE playlist
        songs/
          route.ts            # POST, DELETE songs in playlist
      route.ts                # GET all, POST create playlist
    songs/
      search/
        route.ts              # GET search songs
  layout.tsx                  # Root layout with providers
  page.tsx                    # Main page component
  globals.css                 # Global styles + Spotify scrollbar
components/
  atoms/                      # Small reusable components
    CoverImage.tsx            # Image wrapper with fill mode
    PlaylistCover.tsx         # Cover grid (1/2x2/3+1/4 layout)
    PlaylistItem.tsx          # Sidebar playlist item
    MenuCard.tsx              # Dropdown menu card
  molecules/                  # Composite components
    EditPlaylistModal.tsx     # Edit details dialog
    FindSongs.tsx             # Song search section
    PlaylistHeader.tsx        # Playlist info + action bar
    PlaylistTable.tsx         # Song table with context menu
    Sidebar.tsx               # Playlist sidebar
    SidebarHeader.tsx         # Sidebar header with create button
  providers/
    QueryProvider.tsx          # TanStack React Query provider
  ui/                         # shadcn/ui components
services/
  playlists.ts                # Playlist API service layer
  songs.ts                    # Song search API service
prisma/
  schema.prisma               # Database schema
  seed.ts                     # Seed data (10 songs, 3 playlists)
  migrations/                 # Migration files
scripts/
  setup-db.sh                 # Full database setup script
lib/
  prisma.ts                   # Prisma client singleton
```

## Database Schema

```
Song          Playlist          PlaylistSong (join table)
--------      ----------        -------------------------
id (uuid)     id (uuid)         playlistId (FK)
title         name              songId (FK)
artist        description?      dateAdded
album?        isPublic
durationMs    createdAt
coverUrl?
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:setup` | Full database setup (Docker + migrate + generate + seed) |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run db:reset` | Reset database (drop all data + re-migrate + re-seed) |
