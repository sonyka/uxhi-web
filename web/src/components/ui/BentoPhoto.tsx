import Image from "next/image";
import { MotionDiv } from "@/components/ui/motion";
import { scaleReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface BentoPhotoProps {
  src: string;
  alt: string;
  /**
   * Grid placement, aspect ratio and the grid's outer corners — the parts that
   * depend on where the tile sits, so the page decides them. A tile is
   * rounded-lg; the corners that land on the outside of the grid take
   * rounded-*-[2rem], per breakpoint, since a 2-up phone grid and a desktop
   * bento put different tiles on the outside.
   */
  className?: string;
  sizes?: string;
}

/**
 * One photo in a page's bento grid (/events, /resources, /get-involved).
 *
 * Every grid is two-up on a phone. They used to stack one photo per row at
 * full width, which on a 390px screen made each photo the whole screen and a
 * four-photo strip three screens of scrolling — a strip meant to be glanced at.
 *
 * One element where there used to be three: a white ground, a clip with a
 * radius 1px larger, and a ring layer on top. A ring on the clipping element
 * draws the same hairline, since a box-shadow is not clipped by its own
 * overflow.
 */
export function BentoPhoto({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 50vw, 900px",
}: BentoPhotoProps) {
  return (
    <MotionDiv
      variants={scaleReveal}
      className={cn(
        "relative overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5",
        className
      )}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </MotionDiv>
  );
}
