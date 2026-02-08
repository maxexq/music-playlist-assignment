"use client";

import { Sidebar } from "@/components/molecules/Sidebar";
import { useState } from "react";
import { toast } from "sonner";

interface Playlist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
}

// Mock song data
const playlists: Song[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Park",
    album: "Nocturnal Vibes",
    duration: "3:45",
    coverUrl:
      "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXIlMjBhcnR8ZW58MXx8fHwxNzcwNDYwODQ3fDA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "2",
    title: "Electric Soul",
    artist: "The Wavelengths",
    album: "Frequency",
    duration: "4:12",
    coverUrl:
      "https://images.unsplash.com/photo-1740459057005-65f000db582f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzcwNDg4OTU5fDA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "3",
    title: "Vinyl Memories",
    artist: "Retro Revival",
    album: "Analog Days",
    duration: "3:28",
    coverUrl:
      "https://images.unsplash.com/photo-1701374929875-37125c54cb29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHR1cm50YWJsZXxlbnwxfHx8fDE3NzA1NjE0MjF8MA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "4",
    title: "Soundwave Paradise",
    artist: "Audio Atlas",
    album: "Headphone Heaven",
    duration: "5:03",
    coverUrl:
      "https://images.unsplash.com/photo-1649956736509-f359d191bbcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwbXVzaWN8ZW58MXx8fHwxNzcwNTYxNDg2fDA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "5",
    title: "String Theory",
    artist: "Marcus Cole",
    album: "Acoustic Sessions",
    duration: "4:31",
    coverUrl:
      "https://images.unsplash.com/photo-1638883296886-6095d6c869d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NzA1NjE0ODd8MA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "6",
    title: "Neon Lights",
    artist: "Synthwave City",
    album: "Future Nostalgia",
    duration: "3:56",
    coverUrl:
      "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXIlMjBhcnR8ZW58MXx8fHwxNzcwNDYwODQ3fDA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "7",
    title: "Rhythm & Blues",
    artist: "Smooth Operators",
    album: "Soulful Journey",
    duration: "4:44",
    coverUrl:
      "https://images.unsplash.com/photo-1740459057005-65f000db582f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzcwNDg4OTU5fDA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "8",
    title: "Jazz in the Night",
    artist: "Midnight Quartet",
    album: "Blue Notes",
    duration: "6:15",
    coverUrl:
      "https://images.unsplash.com/photo-1701374929875-37125c54cb29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHR1cm50YWJsZXxlbnwxfHx8fDE3NzA1NjE0MjF8MA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "9",
    title: "Digital Love",
    artist: "Cyber Hearts",
    album: "Electronic Dreams",
    duration: "3:33",
    coverUrl:
      "https://images.unsplash.com/photo-1649956736509-f359d191bbcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwbXVzaWN8ZW58MXx8fHwxNzcwNTYxNDg2fDA&ixlib=rb-4.1.0&q=80&w=200",
  },
  {
    id: "10",
    title: "Acoustic Sunrise",
    artist: "Morning Breeze",
    album: "Natural Sounds",
    duration: "4:07",
    coverUrl:
      "https://images.unsplash.com/photo-1638883296886-6095d6c869d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NzA1NjE0ODd8MA&ixlib=rb-4.1.0&q=80&w=200",
  },
];

export default function Home() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "favorites",
      name: "My Favorites",
      description: "My personal collection of favorite tracks",
      songIds: ["1", "3", "5"],
    },
  ]);

  const [currentPlaylistId, setCurrentPlaylistId] =
    useState<string>("favorites");
  const [showLibrary, setShowLibrary] = useState(false);

  const handleCreatePlaylist = () => {
    // Calculate next playlist number
    const playlistNumbers = playlists
      .map((p) => {
        const match = p.name.match(/^My Playlist #(\d+)$/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter((n) => n > 0);

    const nextNumber =
      playlistNumbers.length > 0 ? Math.max(...playlistNumbers) + 1 : 1;
    const playlistName = `My Playlist #${nextNumber}`;

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: playlistName,
      description: "",
      songIds: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    setCurrentPlaylistId(newPlaylist.id);
    setShowLibrary(false);
    toast.success(`Playlist "${playlistName}" created!`);
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        playlists={playlists.map((p) => ({
          id: p.id,
          name: p.name,
          songCount: p.songIds.length,
        }))}
        currentPlaylistId={currentPlaylistId}
        onSelectPlaylist={(id) => {
          setCurrentPlaylistId(id);
          setShowLibrary(false);
        }}
        onCreatePlaylist={handleCreatePlaylist}
        onShowLibrary={() => setShowLibrary(true)}
        showingLibrary={showLibrary}
      />
    </div>
  );
}
