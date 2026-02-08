import { Music, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import PlaylistCover from "../atoms/PlaylistCover";
import SidebarHeader, { MenuItems } from "./SidebarHeader";

interface Playlist {
  id: string;
  name: string;
  songCount: number;
}

interface SidebarProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onSelectPlaylist: (id: string) => void;
  onCreatePlaylist: () => void;
  onShowLibrary: () => void;
  showingLibrary: boolean;
}

const mockCoverImages = [
  "https://i.scdn.co/image/ab67616d0000aa54edf5b257be1d6593e81bb45f",
  "https://i.scdn.co/image/ab67616d00001e029d28fd01859073a3ae6ea209",
  "https://i.scdn.co/image/ab67616d0000e1a344cafd1b4f310efd08a8aa08",
  // "https://i.scdn.co/image/ab67616d0000aa54edf5b257be1d6593e81bb45f",
];

const mockCreateListMenu: MenuItems[] = [
  {
    title: "Playlist",
    description: "Create a playlist with songs or episodes",
    icon: Music,

    callback: () => {},
  },
  {
    title: "Playlist",
    description: "Create a playlist with songs or episodes",
    icon: Music,
    callback: () => {},
  },
];

export function Sidebar({
  playlists,
  currentPlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
  onShowLibrary,
  showingLibrary,
}: SidebarProps) {
  return (
    <nav>
      <div className="w-[320px] bg-[#121212] flex flex-1 flex-col h-screen rounded-lg overflow-x-hidden relative">
        <div className="sticky top-0 z-10 bg-[#121212]">
          <SidebarHeader menuItems={mockCreateListMenu} />
        </div>

        <PlaylistCover images={mockCoverImages} />
        <PlaylistCover images={mockCoverImages} />
        <PlaylistCover images={mockCoverImages} />
        <PlaylistCover images={mockCoverImages} />
        <PlaylistCover images={mockCoverImages} />

        <div className="flex-1 overflow-y-auto px-3">
          <div className="flex items-center justify-between px-3 mb-4">
            <span className="text-sm text-zinc-400">Playlists</span>
            <Button
              onClick={onCreatePlaylist}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  currentPlaylistId === playlist.id && !showingLibrary
                    ? "bg-zinc-800"
                    : "hover:bg-zinc-800/50"
                }`}
              >
                <div className="text-sm">{playlist.name}</div>
                <div className="text-xs text-zinc-400">
                  {playlist.songCount} songs
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
