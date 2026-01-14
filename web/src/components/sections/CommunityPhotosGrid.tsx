import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CommunityPhoto {
  _id: string;
  image: {
    asset: { _id: string; url: string };
  };
  name?: string;
  column: number;
  row: number;
}

interface CommunityPhotosGridProps {
  photos: CommunityPhoto[];
}

// Define the grid structure: which columns have which vertical offsets
const columnConfig = [
  { column: 1, offset: "pt-16", maxRows: 2 },
  { column: 2, offset: "", maxRows: 2 },
  { column: 3, offset: "pt-24", maxRows: 1 },
  { column: 4, offset: "pt-8", maxRows: 1 },
  { column: 5, offset: "pt-24", maxRows: 1 },
  { column: 6, offset: "pt-8", maxRows: 1 },
  { column: 7, offset: "pt-24", maxRows: 1 },
  { column: 8, offset: "", maxRows: 2 },
  { column: 9, offset: "pt-16", maxRows: 2 },
];

export function CommunityPhotosGrid({ photos }: CommunityPhotosGridProps) {
  // Group photos by column
  const photosByColumn = columnConfig.map((config) => ({
    ...config,
    photos: photos
      .filter((p) => p.column === config.column)
      .sort((a, b) => a.row - b.row)
      .slice(0, config.maxRows),
  }));

  // Check if we have any Sanity photos
  const hasSanityPhotos = photos && photos.length > 0;

  return (
    <>
      {/* Desktop Grid (9 columns) */}
      <div className="hidden lg:grid grid-cols-9 gap-4 mb-16">
        {photosByColumn.map((col) => (
          <div key={col.column} className={`flex flex-col gap-4 ${col.offset}`}>
            {hasSanityPhotos && col.photos.length > 0 ? (
              col.photos.map((photo) => (
                <div
                  key={photo._id}
                  className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden relative"
                >
                  <Image
                    src={urlFor(photo.image).width(270).height(360).url()}
                    alt={photo.name || "Community member"}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              // Fallback placeholders
              Array.from({ length: col.maxRows }).map((_, i) => (
                <div
                  key={`placeholder-${col.column}-${i}`}
                  className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden"
                />
              ))
            )}
          </div>
        ))}
      </div>

      {/* Tablet Grid (5 columns) */}
      <div className="hidden md:grid lg:hidden grid-cols-5 gap-4 mb-12">
        {[1, 2, 3, 4, 5].map((colNum) => {
          const offset = colNum === 1 ? "pt-8" : colNum === 3 ? "pt-12" : colNum === 4 ? "pt-4" : "";
          const colPhotos = photos.filter((p) => p.column === colNum || p.column === colNum + 4).slice(0, 2);
          return (
            <div key={colNum} className={`flex flex-col gap-4 ${offset}`}>
              {hasSanityPhotos && colPhotos.length > 0 ? (
                colPhotos.map((photo) => (
                  <div
                    key={photo._id}
                    className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden relative"
                  >
                    <Image
                      src={urlFor(photo.image).width(270).height(360).url()}
                      alt={photo.name || "Community member"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                Array.from({ length: colNum === 3 ? 1 : 2 }).map((_, i) => (
                  <div
                    key={`tablet-placeholder-${colNum}-${i}`}
                    className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden"
                  />
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Grid (3 columns) */}
      <div className="md:hidden grid grid-cols-3 gap-3 mb-10">
        {[1, 2, 3].map((colNum) => {
          const offset = colNum === 1 ? "pt-6" : colNum === 3 ? "pt-10" : "";
          const colPhotos = photos.filter((p) => p.column === colNum || p.column === colNum + 3 || p.column === colNum + 6).slice(0, 2);
          return (
            <div key={colNum} className={`flex flex-col gap-3 ${offset}`}>
              {hasSanityPhotos && colPhotos.length > 0 ? (
                colPhotos.map((photo) => (
                  <div
                    key={photo._id}
                    className="w-full aspect-[3/4] rounded-[12px] bg-gray-200 overflow-hidden relative"
                  >
                    <Image
                      src={urlFor(photo.image).width(200).height(267).url()}
                      alt={photo.name || "Community member"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={`mobile-placeholder-${colNum}-${i}`}
                    className="w-full aspect-[3/4] rounded-[12px] bg-gray-200 overflow-hidden"
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
