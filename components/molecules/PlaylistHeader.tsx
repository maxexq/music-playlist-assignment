import React from "react";
import {
  Play,
  Shuffle,
  Heart,
  MoreHorizontal,
  Download,
  UserPlus,
  ListMusic,
  Search,
} from "lucide-react";
import PlaylistCover from "@/components/atoms/PlaylistCover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PlaylistHeaderProps {
  name: string;
  description?: string;
  coverImages?: string[];
  songCount: number;
  totalDuration: string;
  isLiked?: boolean;
  onPlay?: () => void;
  onShuffle?: () => void;
  onLike?: () => void;
  onAddToQueue?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSearch?: () => void;
  showSearch?: boolean;
}

const PlaylistHeader = (props: PlaylistHeaderProps) => {
  const {
    name,
    description,
    coverImages = [],
    songCount,
    totalDuration,
    isLiked = false,
    onPlay,
    onShuffle,
    onLike,
    onAddToQueue,
    onDownload,
    onShare,
    onEdit,
    onDelete,
    onSearch,
    showSearch = false,
  } = props;

  return (
    <div className="p-6">
      {/* Playlist Info */}
      <div className="flex items-end gap-6 mb-6">
        <PlaylistCover
          images={coverImages}
          size={192}
          className="shadow-2xl"
          priority
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white uppercase">Playlist</p>
          <h1 className="text-5xl font-bold text-white mt-2 mb-4 truncate">
            {name}
          </h1>
          {description && (
            <p className="text-sm text-[#b3b3b3] mb-2 line-clamp-2">
              {description}
            </p>
          )}
          <p className="text-sm text-[#b3b3b3]">
            <span className="text-white font-medium">{songCount} songs</span>
            <span className="mx-1">•</span>
            <span>{totalDuration}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onPlay}
              className="size-14 rounded-full bg-[#1db954] hover:bg-[#1ed760] hover:scale-105 transition-all"
            >
              <Play className="size-6 fill-black text-black ml-1" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Play</TooltipContent>
        </Tooltip>

        {/* Shuffle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onShuffle}
              variant="ghost"
              className="size-12 rounded-full text-[#b3b3b3] hover:text-white hover:bg-transparent"
            >
              <Shuffle className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Shuffle</TooltipContent>
        </Tooltip>

        {/* Like Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onLike}
              variant="ghost"
              className={`size-12 rounded-full hover:bg-transparent ${
                isLiked ? "text-[#1db954]" : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              <Heart className={`size-6 ${isLiked ? "fill-[#1db954]" : ""}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isLiked ? "Remove from Your Library" : "Save to Your Library"}
          </TooltipContent>
        </Tooltip>

        {/* Download Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onDownload}
              variant="ghost"
              className="size-12 rounded-full text-[#b3b3b3] hover:text-white hover:bg-transparent"
            >
              <Download className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-12 rounded-full text-[#b3b3b3] hover:text-white hover:bg-transparent"
            >
              <MoreHorizontal className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-52 bg-[#282828] border-none text-white"
          >
            <DropdownMenuItem
              onClick={onAddToQueue}
              className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
            >
              <ListMusic className="size-4 mr-3" />
              Add to queue
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#ffffff1a]" />
            <DropdownMenuItem
              onClick={onEdit}
              className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
            >
              Edit details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onShare}
              className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer"
            >
              <UserPlus className="size-4 mr-3" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#ffffff1a]" />
            <DropdownMenuItem
              onClick={onDelete}
              className="focus:bg-[#ffffff1a] focus:text-white cursor-pointer text-red-400"
            >
              Delete playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search in Playlist */}
        <div className="ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onSearch}
                variant="ghost"
                className={`size-10 rounded-full hover:bg-transparent ${
                  showSearch ? "text-white" : "text-[#b3b3b3] hover:text-white"
                }`}
              >
                <Search className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search in playlist</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlaylistHeader);
