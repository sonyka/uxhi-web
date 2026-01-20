# Framer to Static Site Conversion Guide

This document describes the process of converting Framer-hosted conference websites to static files served from the `/public` directory.

## Overview

The 2024 UXHI Conference website was originally hosted on Framer at `https://uxhiconference.com/2024`. It has been converted to static files and is now served from `/conferences/2024/` on the main website.

### Why Static Conversion?

- **Performance**: Static files load faster without Framer's runtime JavaScript
- **Control**: Full ownership of assets and content
- **Cost**: No ongoing Framer subscription for archived conferences
- **Stability**: No dependency on third-party platform availability

## Directory Structure

```
web/
├── public/conferences/2024/           # Static site output
│   ├── index.html                     # Main page
│   └── assets/
│       ├── css/                       # Stylesheets
│       ├── js/
│       │   └── interactions.js        # Custom interactive behaviors
│       ├── images/                    # Downloaded images + custom SVGs
│       │   ├── geometric-pattern.svg  # Background patterns
│       │   ├── sandbox-logo.svg       # Sponsor logos
│       │   ├── finn-logo.svg
│       │   ├── shaka-guide-logo.svg
│       │   ├── terranox-logo.svg
│       │   ├── the-lineup-heading.svg # Decorative headings
│       │   └── portfolio-reviews-heading.svg
│       ├── fonts/                     # Web fonts
│       └── data/
│           └── popover-data.json      # Speaker bios and agenda data
│
└── scripts/scrape-conference/         # Scraping scripts
    ├── pyproject.toml                 # Python dependencies (uv)
    ├── scraper.py                     # Main scraper
    └── extract_popovers.py            # Popover data extraction
```

## Scripts

### Prerequisites

Install [uv](https://github.com/astral-sh/uv) (Python package manager):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Main Scraper (`scraper.py`)

The main scraper captures the full page HTML, downloads assets, and generates basic interaction JavaScript.

**Usage:**
```bash
cd web/scripts/scrape-conference
uv sync
uv run python scraper.py \
    --url https://uxhiconference.com/2024 \
    --output ../../public/conferences/2024
```

**What it does:**
1. Launches headless Chrome via Playwright
2. Waits for Framer's dynamic content to load (`networkidle`)
3. Scrolls through page to trigger lazy-loaded images
4. Captures speaker and agenda popovers by clicking elements
5. Downloads all assets (images, CSS, fonts)
6. Rewrites URLs to local paths
7. Generates `interactions.js` with popover/accordion logic

**Limitations:**
- Initial scrape may have incomplete popover data
- Some Framer elements render as background images (not captured)
- Complex SVG graphics may need manual extraction

### Popover Extractor (`extract_popovers.py`)

Extracts detailed speaker bios and agenda data by clicking each element.

**Usage:**
```bash
cd web/scripts/scrape-conference
uv run python extract_popovers.py
```

**Output:** `../../public/conferences/2024/assets/data/popover-data.json`

This script runs in non-headless mode so you can watch it click through speakers and capture their expanded bios.

## Common Issues & Fixes

### 1. Missing Background Images (SVG Graphics)

Framer often renders decorative text and logos as CSS `background-image` with SVG data URLs. These may not survive the scraping process.

**Symptoms:**
- Empty boxes where headings should appear
- Missing sponsor logos
- Missing decorative patterns

**Solution:**
1. Open the live Framer site in browser DevTools
2. Inspect the element with the missing graphic
3. Find the computed `background-image` style
4. Extract the SVG from the data URL or recreate it
5. Save as `.svg` file in `assets/images/`
6. Add CSS rule in `interactions.js`:

```css
/* Fix missing THE LINEUP heading */
.framer-qejdxe {
    background-image: url('/conferences/2024/assets/images/the-lineup-heading.svg') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}
```

**Examples fixed:**
- `THE LINEUP` heading (class `.framer-qejdxe`)
- `PORTFOLIO REVIEWS` heading (class `.framer-afxzt5`)
- Geometric pattern background (class `.framer-18whoki`)
- Sponsor logos (Sandbox, HTDC, FINN, Shaka Guide, Terranox)

### 2. Unicode Character Mismatches

Framer and JSON may use different Unicode characters for apostrophes and quotes, causing name matching to fail.

**Symptoms:**
- Speaker popover doesn't appear when clicking their card
- Name exists in JSON but click doesn't work

**Solution:**
The `interactions.js` includes a `normalizeText()` function that handles:

```javascript
function normalizeText(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // Strip diacritical marks
        .replace(/[\u0027\u2019\u2018\u02BB]/g, "'")  // Normalize apostrophes
        .replace(/[\u201C\u201D]/g, '"')   // Normalize quotes
        .replace(/\s+/g, ' ')              // Collapse whitespace
        .trim();
}
```

**Characters handled:**
- `'` (U+0027) - Standard apostrophe
- `'` (U+2019) - Right single quotation mark
- `'` (U+2018) - Left single quotation mark
- `ʻ` (U+02BB) - Hawaiian okina

**Example:** "Scott Na'auao" in the HTML had U+2018 (curly quote) while the JSON had U+0027 (straight apostrophe).

### 3. FAQ Answer Text Width

Framer sets very narrow widths on FAQ answer text elements.

**Fix in CSS:**
```css
[data-framer-name="Answer"] * {
    width: auto !important;
    min-width: 0 !important;
}
```

### 4. Click-Blocking Overlays

Framer's overlay elements can block all click events on the page.

**Fix in JavaScript:**
```javascript
function fixOverlayBlocking() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.style.pointerEvents = 'none';
        overlay.querySelectorAll('*').forEach(el => {
            el.style.pointerEvents = 'none';
        });
    }
}
```

### 5. Broken Social Icons

Speaker cards have social media icons that don't render after scraping.

**Fix:** Hide original icons and show links in the popover instead:
```javascript
function hideBrokenSocialIcons() {
    const desktopCards = document.querySelectorAll('[data-framer-name="Desktop"]');
    desktopCards.forEach(desktop => {
        const links = desktop.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            link.style.display = 'none';
        });
    });
}
```

## Extracting SVG Graphics from Framer

### Method 1: Browser DevTools (Recommended)

1. Open the Framer site in Chrome
2. Right-click the element > Inspect
3. In the Styles panel, find `background-image`
4. Copy the `url("data:image/svg+xml,...")` value
5. Decode the URL-encoded SVG
6. Save as `.svg` file

### Method 2: Playwright Console

```javascript
// In the browser console or Playwright
const el = document.querySelector('.framer-qejdxe');
const style = getComputedStyle(el);
console.log(style.backgroundImage);
```

### Method 3: Extract Path Data Only

For complex SVG graphics, you may need to extract path data in chunks:

```javascript
// Get path data from SVG element
const svgPath = document.querySelector('path');
const d = svgPath.getAttribute('d');
// Copy 'd' attribute value
```

Then construct an SVG file:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 594 158">
  <path d="[path data here]" fill="rgb(35,23,105)"></path>
</svg>
```

## Reusing for Future Conferences

### 2025 Conference Example

```bash
# 1. Run the scraper
cd web/scripts/scrape-conference
uv run python scraper.py \
    --url https://uxhiconference.com/2025 \
    --output ../../public/conferences/2025

# 2. Extract popover data
# Edit extract_popovers.py to point to 2025 URL
uv run python extract_popovers.py

# 3. Start dev server and test
cd web && npm run dev
# Open http://localhost:3000/conferences/2025/

# 4. Fix missing elements
# Inspect for missing images/SVGs and add to interactions.js
```

### Checklist for New Conversions

- [ ] Page renders with correct layout
- [ ] All images load (check Network tab)
- [ ] Speaker popovers work (click each speaker card)
- [ ] Agenda tooltips work (click session titles)
- [ ] FAQ accordions expand/collapse
- [ ] Navigation links scroll to sections
- [ ] External links work (tickets, social media)
- [ ] Mobile responsive (resize browser)
- [ ] No console errors

## File Reference

### `interactions.js`

The main JavaScript file that handles:

| Function | Purpose |
|----------|---------|
| `init()` | Entry point, loads data and initializes features |
| `initSpeakerPopovers()` | Document-level click handler for speaker cards |
| `showSpeakerPopover()` | Creates and displays speaker bio popover |
| `initAgendaTooltips()` | Click handler for agenda session titles |
| `showAgendaTooltip()` | Creates and displays agenda session tooltip |
| `initFAQAccordions()` | Expand/collapse for FAQ items |
| `normalizeText()` | Unicode normalization for name matching |
| `addPopoverStyles()` | Injects CSS for popovers and fixes |
| `hideBrokenSocialIcons()` | Hides non-functional social icons |
| `fixOverlayBlocking()` | Makes Framer overlays non-blocking |

### `popover-data.json`

```json
{
  "speakers": [
    {
      "name": "Speaker Name",
      "title": "Job Title",
      "bio": "Speaker biography...",
      "links": [
        { "href": "https://linkedin.com/in/...", "type": "linkedin" }
      ],
      "imageUrl": "..."
    }
  ],
  "agenda": [
    {
      "time": "9:00 am",
      "room": "Main Room",
      "type": "keynote",
      "title": "Session Title",
      "speaker": "Speaker Name",
      "description": "Session description..."
    }
  ]
}
```

## Troubleshooting

### "Speaker popover doesn't work for [name]"

1. Check if the name exists in `popover-data.json`
2. Check for Unicode differences (copy both names to a hex editor)
3. Add the character to `normalizeText()` if needed
4. Verify the speaker card has `data-framer-name="Desktop"`

### "Element appears empty/broken"

1. Inspect the element class (e.g., `.framer-abc123`)
2. Check computed styles for `background-image`
3. Extract and save the SVG
4. Add CSS fix in `addPopoverStyles()`

### "Clicks don't work"

1. Check for blocking overlay elements
2. Verify `pointer-events` isn't set to `none` on parents
3. Check z-index of elements
4. Use document-level click handler with capture phase

## Version History

| Date | Changes |
|------|---------|
| 2024-01 | Initial conversion from Framer |
| 2024-01 | Added speaker popovers and agenda tooltips |
| 2024-01 | Fixed sponsor logos (Sandbox, HTDC, FINN, etc.) |
| 2024-01 | Fixed THE LINEUP heading |
| 2024-01 | Fixed Scott Na'auao Unicode apostrophe |
| 2024-01 | Fixed PORTFOLIO REVIEWS heading |
