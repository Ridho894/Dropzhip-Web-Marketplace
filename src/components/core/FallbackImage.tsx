import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src?: string;
  fallbackSrc?: string;
  type?: "online media" | "public";
};

export const FallbackImage: React.FC<Props> = ({
  src,
  alt,
  type = "public",
  fallbackSrc,
  ...rest
}) => {
  const iconType =
    type === "public"
      ? "/illustrations/image-broken.svg"
      : "/illustrations/image-broken-online-media.svg";
  const defaultFallbackSrc =
    typeof window === "object" ? window.location.origin + iconType : iconType;

  const [imageSrc, setImageSrc] = useState<string>(src || defaultFallbackSrc);

  return (
    <Image
      {...rest}
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc(fallbackSrc || defaultFallbackSrc)}
    />
  );
};
