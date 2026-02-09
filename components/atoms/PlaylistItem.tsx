import React from "react";
import { Music } from "lucide-react";
import Image from "next/image";

export interface PlaylistItemProps {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  songCount: number;
  isActive?: boolean;
  onClick?: () => void;
}

const PlaylistItem = (props: PlaylistItemProps) => {
  const {
    name,
    description,
    coverUrl,
    songCount,
    isActive = false,
    onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors group ${
        isActive ? "bg-[#ffffff1a]" : "hover:bg-[#ffffff0d]"
      }`}
    >
      <div className="relative size-12 rounded overflow-hidden shrink-0 bg-[#282828]">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music size={20} className="text-[#b3b3b3]" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p
          className={`text-base font-normal truncate ${
            isActive ? "text-[#1db954]" : "text-white"
          }`}
        >
          {name}
        </p>
        <p className="text-sm text-[#b3b3b3] truncate">
          Playlist {description ? `• ${description}` : `• ${songCount} songs`}
        </p>
      </div>
    </button>
  );
};

export default React.memo(PlaylistItem);
