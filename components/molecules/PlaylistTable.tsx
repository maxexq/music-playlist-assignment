import React, { useState } from "react";
import {
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Clock,
  ListPlus,
  Radio,
  UserPlus,
  Ban,
  Trash2,
} from "lucide-react";
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
import Image from "next/image";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
}

export interface PlaylistTableProps {
  songs: Song[];
  playlists: Playlist[];
  currentPlayingSongId?: string | null;
  isPlaying?: boolean;
  likedSongIds?: string[];
  onPlaySong: (songId: string) => void;
  onPauseSong: () => void;
  onLikeSong: (songId: string) => void;
  onUnlikeSong: (songId: string) => void;
  onAddToQueue: (songId: string) => void;
  onAddToPlaylist: (songId: string, playlistId: string) => void;
  onRemoveFromPlaylist: (songId: string) => void;
  onGoToArtist: (artist: string) => void;
  onGoToAlbum: (album: string) => void;
  onStartRadio: (songId: string) => void;
  onShare: (songId: string) => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const PlaylistTable = (props: PlaylistTableProps) => {
  const {
    songs,
    playlists,
    currentPlayingSongId,
    isPlaying = false,
    likedSongIds = [],
    onPlaySong,
    onPauseSong,
    onLikeSong,
    onUnlikeSong,
    onAddToQueue,
    onAddToPlaylist,
    onRemoveFromPlaylist,
    onGoToArtist,
    onGoToAlbum,
    onStartRadio,
    onShare,
  } = props;

  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="px-6">
      {/* Table Header */}
      <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-[#ffffff1a] text-[#b3b3b3] text-sm">
        <span className="text-center">#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="flex justify-end">
          <Clock className="size-4" />
        </span>
      </div>

      {/* Song Rows */}
      <div className="mt-2">
        {songs.map((song, index) => {
          const isCurrentSong = currentPlayingSongId === song.id;
          const isHovered = hoveredRow === song.id;
          const isLiked = likedSongIds.includes(song.id);

          return (
            <div
              key={song.id}
              className={`grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 rounded-md group transition-colors ${
                isHovered ? "bg-[#ffffff1a]" : ""
              }`}
              onMouseEnter={() => setHoveredRow(song.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Index / Play Button */}
              <div className="flex items-center justify-center">
                {isHovered ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-4 p-0 hover:bg-transparent"
                    onClick={() =>
                      isCurrentSong && isPlaying
                        ? onPauseSong()
                        : onPlaySong(song.id)
                    }
                  >
                    {isCurrentSong && isPlaying ? (
                      <Pause className="size-4 fill-white text-white" />
                    ) : (
                      <Play className="size-4 fill-white text-white" />
                    )}
                  </Button>
                ) : (
                  <span
                    className={`text-sm ${
                      isCurrentSong ? "text-[#1db954]" : "text-[#b3b3b3]"
                    }`}
                  >
                    {isCurrentSong && isPlaying ? (
                      <div className="flex gap-0.5 items-end h-3">
                        <span className="w-0.5 bg-[#1db954] animate-pulse h-2" />
                        <span className="w-0.5 bg-[#1db954] animate-pulse h-3" />
                        <span className="w-0.5 bg-[#1db954] animate-pulse h-1" />
                      </div>
                    ) : (
                      index + 1
                    )}
                  </span>
                )}
              </div>

              {/* Title & Artist */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-10 rounded overflow-hidden shrink-0 bg-[#282828]">
                  <Image
                    src={song.coverUrl}
                    alt={song.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-base truncate ${
                      isCurrentSong ? "text-[#1db954]" : "text-white"
                    }`}
                  >
                    {song.title}
                  </p>
                  <p
                    className="text-sm text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer"
                    onClick={() => onGoToArtist(song.artist)}
                  >
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* Album */}
              <div className="flex items-center min-w-0">
                <span
                  className="text-sm text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer"
                  onClick={() => onGoToAlbum(song.album)}
                >
                  {song.album}
                </span>
              </div>

              {/* Duration & Actions */}
              <div className="flex items-center justify-end gap-2">
                {/* Like Button (visible on hover) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`size-8 p-0 hover:bg-transparent transition-opacity ${
                    isHovered || isLiked ? "opacity-100" : "opacity-0"
                  } ${isLiked ? "text-[#1db954]" : "text-[#b3b3b3] hover:text-white"}`}
                  onClick={() =>
                    isLiked ? onUnlikeSong(song.id) : onLikeSong(song.id)
                  }
                >
                  <Heart
                    className={`size-4 ${isLiked ? "fill-[#1db954]" : ""}`}
                  />
                </Button>

                {/* Duration */}
                <span className="text-sm text-[#b3b3b3] w-12 text-right">
                  {formatDuration(song.duration)}
                </span>

                {/* More Options (visible on hover) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`size-8 p-0 hover:bg-transparent text-[#b3b3b3] hover:text-white transition-opacity ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 bg-[#282828] border-none text-white"
                  >
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer">
                        <ListPlus className="size-4 mr-3" />
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
                    <DropdownMenuItem
                      onClick={() => onAddToQueue(song.id)}
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                    >
                      <ListPlus className="size-4 mr-3" />
                      Add to queue
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#ffffff1a]" />
                    <DropdownMenuItem
                      onClick={() => onStartRadio(song.id)}
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                    >
                      <Radio className="size-4 mr-3" />
                      Go to song radio
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onGoToArtist(song.artist)}
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                    >
                      Go to artist
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onGoToAlbum(song.album)}
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                    >
                      Go to album
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#ffffff1a]" />
                    <DropdownMenuItem
                      onClick={() =>
                        isLiked ? onUnlikeSong(song.id) : onLikeSong(song.id)
                      }
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                    >
                      <Heart className="size-4 mr-3" />
                      {isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onShare(song.id)}
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
                    >
                      <UserPlus className="size-4 mr-3" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#ffffff1a]" />
                    <DropdownMenuItem
                      onClick={() => onRemoveFromPlaylist(song.id)}
                      className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer text-red-400"
                    >
                      <Trash2 className="size-4 mr-3" />
                      Remove from this playlist
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>

      {songs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#b3b3b3] text-lg">No songs in this playlist</p>
          <p className="text-[#b3b3b3] text-sm mt-2">
            Add songs to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(PlaylistTable);
