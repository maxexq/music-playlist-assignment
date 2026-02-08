import { Plus, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MenuCard from "@/components/atoms/MenuCard";

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

export function Sidebar({
  playlists,
  currentPlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
  onShowLibrary,
  showingLibrary,
}: SidebarProps) {
  return (
    <div className="w-64 bg-[#121212]  flex flex-col h-screen rounded-lg overflow-y-auto relative p-2">
      <div className="p-4 sticky w-full">
        <div className="flex items-center gap-2 mb-8 justify-between">
          <span className="text-l font-semibold text-white">Your Library</span>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-[#282828] rounded-full">
                      <Plus /> Create
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Create a playlist</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-[#282828] border-none p-1"
              >
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <MenuCard
                    title="Playlist"
                    description="Create a playlist with songs or episodes"
                    icon={Music}
                    variant="dropdown"
                    onClick={onCreatePlaylist}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <MenuCard
        title="Playlist"
        description="Create a playlist with songs or episodes"
        icon={Music}
      />

      <MenuCard title="Playlist" icon={Music} variant="menu" />

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
  );
}
