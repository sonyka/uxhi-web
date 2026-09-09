import { InstagramGrid } from "web";
import type { ComponentProps } from "react";

type InstagramPost = ComponentProps<typeof InstagramGrid>["posts"][number];

/**
 * Curated posts from Sanity (conferenceInstagramPost) — editors hand-pick the
 * conference posts that appear. Images are live Sanity CDN assets already
 * cropped to Instagram's 1080×1350, so they resolve here as they do on site.
 */
const POSTS: InstagramPost[] = [
  {
    _id: "ig-1",
    postUrl: "https://www.instagram.com/p/DcwXW8fDq-3/?img_index=1",
    image:
      "https://cdn.sanity.io/images/evh83z0t/production/137127dfa923f37eb3c0cae1b3ef4085e4b9ecb7-1080x1350.png",
    imageAlt: "UXHI Conference announcement post",
  },
  {
    _id: "ig-2",
    postUrl: "https://www.instagram.com/p/Da56rldjsrj/",
    image:
      "https://cdn.sanity.io/images/evh83z0t/production/02196456efb45e7ae90b23acb0c9733198594f97-1080x1350.png",
    imageAlt: "UXHI Conference post",
  },
  {
    _id: "ig-3",
    postUrl: "https://www.instagram.com/p/DZ-sa9ljj6O/",
    image:
      "https://cdn.sanity.io/images/evh83z0t/production/dedec6a55e86279c2f10ab8384bc0d233dea6b2c-1080x1350.png",
    imageAlt: "UXHI Conference post",
  },
  {
    _id: "ig-4",
    postUrl: "https://www.instagram.com/p/Dbv_e1yjtcr/?img_index=1",
    image:
      "https://cdn.sanity.io/images/evh83z0t/production/b300cffc14d68d0c586e311ecf50b6636489a28e-1080x1350.png",
    imageAlt: "UXHI Conference post",
  },
  {
    _id: "ig-5",
    postUrl: "https://www.instagram.com/p/DcCEhOkjo1P/",
    image:
      "https://cdn.sanity.io/images/evh83z0t/production/95dd95788f1672f6fa361d9f904623a17eae72d6-1080x1350.png",
    imageAlt: "UXHI Conference post",
  },
  {
    _id: "ig-6",
    postUrl: "https://www.instagram.com/p/DZsq5NtDpgL/",
    image:
      "https://cdn.sanity.io/images/evh83z0t/production/1d8d010976302393c8f7e613cd04cb523b1396a3-1080x1350.png",
    imageAlt: "UXHI Conference post",
  },
];

/**
 * The section as the page mounts it: intro with both handles inline, the tile
 * grid, then the two outline follow pills. Three posts so the whole section
 * fits one frame — the live page currently curates six, i.e. two full rows.
 */
export const Curated = () => <InstagramGrid posts={POSTS.slice(0, 3)} />;

/**
 * With captions. They clamp at two lines under each tile, so a long caption
 * cannot push one card taller than its neighbours in the row.
 */
export const WithCaptions = () => (
  <InstagramGrid
    posts={[
      {
        ...POSTS[0],
        caption: "Tickets for UXHICon 2026 are live — October 17 at the Entrepreneurs Sandbox.",
      },
      {
        ...POSTS[1],
        caption: "Mahalo to Zippy's, Servco and Purple Maiʻa for backing this year's conference.",
      },
      {
        ...POSTS[2],
        caption:
          "Behind the scenes with the volunteer crew who put the whole day together, from check-in to the closing mixer downstairs.",
      },
    ]}
  />
);
