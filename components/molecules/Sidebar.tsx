import { Music } from "lucide-react";

import SidebarHeader, { MenuItems } from "./SidebarHeader";
import PlaylistItem from "../atoms/PlaylistItem";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImages: string[];
  songCount: number;
}

interface SidebarProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onSelectPlaylist: (id: string) => void;
  onCreatePlaylist: () => void;
  loading?: boolean;
}

export function Sidebar(props: SidebarProps) {
  const {
    playlists,
    currentPlaylistId,
    onSelectPlaylist,
    onCreatePlaylist,
    loading = false,
  } = props;
  const menuItems: MenuItems[] = [
    {
      title: "Playlist",
      description: "Create a playlist with songs",
      icon: Music,
      callback: onCreatePlaylist,
    },
  ];

  return (
    <nav>
      <div className="w-70 sm:w-[320px] bg-[#121212] flex flex-1 flex-col h-screen rounded-lg overflow-hidden relative">
        <div className="sticky top-0 z-10 bg-[#121212]">
          <SidebarHeader menuItems={menuItems} />
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
            </div>
          ) : playlists.length === 0 ? (
            <div className="text-center py-8 px-4">
              <p className="text-[#b3b3b3] text-sm">No playlists yet</p>
              <p className="text-[#b3b3b3] text-xs mt-1">
                Create your first playlist
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {playlists.map((playlist) => (
                <PlaylistItem
                  key={playlist.id}
                  id={playlist.id}
                  name={playlist.name}
                  description={playlist.description}
                  coverImages={playlist.coverImages}
                  songCount={playlist.songCount}
                  isActive={currentPlaylistId === playlist.id}
                  onClick={() => onSelectPlaylist(playlist.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
