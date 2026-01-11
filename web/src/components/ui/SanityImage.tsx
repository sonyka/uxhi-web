import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface SanityImageProps {
  value: {
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export function SanityImage({
  value,
  width = 800,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
}: SanityImageProps) {
  if (!value?.asset) return null;

  const computedHeight = height || Math.round(width * 0.66);

  const imageUrl = urlFor(value)
    .width(width)
    .height(computedHeight)
    .auto("format")
    .url();

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={value.alt || ""}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
        placeholder={value.asset?.metadata?.lqip ? "blur" : undefined}
        blurDataURL={value.asset?.metadata?.lqip}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={value.alt || ""}
      width={width}
      height={computedHeight}
      className={className}
      priority={priority}
      placeholder={value.asset?.metadata?.lqip ? "blur" : undefined}
      blurDataURL={value.asset?.metadata?.lqip}
    />
  );
}
