import React from "react";
import Image from "next/image";

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  index?: number;
}

const CoverImage = (props: ImageProps) => {
  const { src, alt, width, index, priority = false } = props;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        key={`image-${index}`}
        src={src}
        alt={alt}
        fill
        sizes={`${width * 2}px`}
        loading={priority ? "eager" : "lazy"}
        priority={priority && index === 0}
        className="object-cover"
      />
    </div>
  );
};

export default React.memo(CoverImage);
