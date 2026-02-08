import React from "react";
import { Music } from "lucide-react";
import CoverImage from "./CoverImage";

interface PlaylistCoverProps {
  images?: string[];
  size?: number;
  className?: string;
  priority?: boolean;
}

const DefaultCell = () => (
  <div className="w-full h-full bg-[#282828] flex items-center justify-center">
    <Music size={48} className="text-[#b3b3b3]" />
  </div>
);

const PlaylistCover = (props: PlaylistCoverProps) => {
  const { images = [], size = 232, className = "", priority = false } = props;

  const count = images.length;
  const gridSize = Math.ceil(size / 2);

  const renderContent = () => {
    switch (true) {
      case count >= 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            {images.slice(0, 4).map((src, i) => (
              <CoverImage
                key={i}
                src={src}
                alt={`Cover ${i + 1}`}
                width={gridSize}
                height={gridSize}
                priority={priority && i === 0}
              />
            ))}
          </div>
        );
      case count === 3:
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            {images.map((src, i) => (
              <CoverImage
                key={i}
                src={src}
                alt={`Cover ${i + 1}`}
                width={gridSize}
                height={gridSize}
                priority={priority}
              />
            ))}
            <DefaultCell />
          </div>
        );
      case count >= 1:
        return (
          <CoverImage
            src={images[0]}
            alt="Cover"
            width={gridSize}
            height={gridSize}
            priority={priority}
          />
        );
      default:
        return <DefaultCell />;
    }
  };

  return (
    <div
      className={`rounded-md overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {renderContent()}
    </div>
  );
};

export default React.memo(PlaylistCover);
