import React, { useState } from "react";
import { Play, Heart, MoreHorizontal, Clock, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  dateAdded: string;
}

export interface Playlist {
  id: string;
  name: string;
}

export interface PlaylistTableProps {
  songs: Song[];
  playlists: Playlist[];
  onAddToPlaylist: (songId: string, playlistId: string) => void;
  onRemoveFromPlaylist: (songId: string) => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatDateAdded = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PlaylistTable = (props: PlaylistTableProps) => {
  const { songs, playlists, onAddToPlaylist, onRemoveFromPlaylist } = props;

  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="px-3 sm:px-6 mb-4">
      <div className="grid grid-cols-[16px_1fr_minmax(80px,auto)] lg:grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-2 sm:gap-4 px-2 sm:px-4 py-2 border-b border-[#ffffff1a] text-[#b3b3b3] text-sm">
        <span className="text-center">#</span>
        <span>Title</span>
        <span className="hidden lg:block">Album</span>
        <span className="hidden lg:block">Date added</span>
        <span className="flex justify-end">
          <Clock className="size-4" />
        </span>
      </div>

      <div className="mt-2">
        {songs.map((song, index) => {
          const isHovered = hoveredRow === song.id;

          return (
            <ContextMenu key={song.id}>
              <ContextMenuTrigger asChild>
                <div
                  className={`grid grid-cols-[16px_1fr_minmax(80px,auto)] lg:grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-2 sm:gap-4 px-2 sm:px-4 py-2 rounded-md group transition-colors ${
                    isHovered ? "bg-[#ffffff1a]" : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(song.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="flex items-center justify-center">
                    {isHovered ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-4 p-0 hover:bg-transparent"
                      >
                        <Play className="size-4 fill-white text-white" />
                      </Button>
                    ) : (
                      <span className="text-sm text-[#b3b3b3]">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative size-10 rounded overflow-hidden shrink-0 bg-[#282828]">
                      <Image
                        src={song.coverUrl}
                        alt={song.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base truncate text-white">
                        {song.title}
                      </p>
                      <p className="text-sm text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center min-w-0">
                    <span className="text-sm text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer">
                      {song.album}
                    </span>
                  </div>

                  <div className="hidden lg:flex items-center min-w-0">
                    <span className="text-sm text-[#b3b3b3]">
                      {formatDateAdded(song.dateAdded)}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={
                        "hidden lg:flex size-8 p-0 hover:bg-transparent transition-opacity  opacity-0 text-[#b3b3b3] hover:text-white"
                      }
                    >
                      <Heart className={"size-4 "} />
                    </Button>

                    <span className="text-sm text-[#b3b3b3] w-12 text-right">
                      {formatDuration(song.duration)}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`cursor-pointer size-8 p-0 hover:bg-transparent text-[#b3b3b3] hover:text-white transition-opacity ${
                            isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-64 bg-[#282828] border-none text-white"
                      >
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer">
                            <Plus className="size-4 mr-3" />
                            Add to playlist
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="bg-[#282828] border-none text-white">
                            {playlists.map((playlist) => (
                              <DropdownMenuItem
                                key={playlist.id}
                                onClick={() =>
                                  onAddToPlaylist(song.id, playlist.id)
                                }
                                className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                              >
                                {playlist.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator className="bg-[#ffffff1a]" />
                        <DropdownMenuItem
                          onClick={() => onRemoveFromPlaylist(song.id)}
                          className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer "
                        >
                          <Trash2 className="size-4 mr-3" />
                          Remove from this playlist
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 bg-[#282828] border-none text-white">
                <ContextMenuSub>
                  <ContextMenuSubTrigger className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer">
                    <Plus className="size-4 mr-3" />
                    Add to playlist
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="bg-[#282828] border-none text-white">
                    {playlists.map((playlist) => (
                      <ContextMenuItem
                        key={playlist.id}
                        onClick={() => onAddToPlaylist(song.id, playlist.id)}
                        className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                      >
                        {playlist.name}
                      </ContextMenuItem>
                    ))}
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator className="bg-[#ffffff1a]" />
                <ContextMenuItem
                  onClick={() => onRemoveFromPlaylist(song.id)}
                  className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                >
                  <Trash2 className="size-4 mr-3" />
                  Remove from this playlist
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>

      {songs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#b3b3b3] text-lg">No songs in this playlist</p>
          <p className="text-[#b3b3b3] text-sm mt-2">
            Add songs by searching from find more
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(PlaylistTable);
