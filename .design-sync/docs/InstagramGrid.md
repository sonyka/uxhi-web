---
category: Components
---

InstagramGrid from web. Use via `window.UXHICon2026.InstagramGrid` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Curated

```jsx
() => <InstagramGrid posts={POSTS.slice(0, 3)} />;

/**
 * With captions. They clamp at two lines under each tile, so a long caption
 * cannot push one card taller than its neighbours in the row.
 */
```

### WithCaptions

```jsx
() => (
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
)
```
