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
  const { src, alt, width, height, index, priority = false } = props;

  return (
    <Image
      key={`image-${index}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      priority={priority && index === 0}
      className="w-full h-full object-cover"
    />
  );
};

export default React.memo(CoverImage);
