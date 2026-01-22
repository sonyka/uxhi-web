# HTML Formatting for Conference 2024 Page

## Problem

The Framer-exported `index.html` file has extremely long lines (up to 553,000 characters on a single line), making it nearly impossible to edit or work with in any IDE.

## Progress

[x] page-00.png
[x] page-01.png
[x] page-02.png
[x] page-03.png
[x] page-04.png
[x] page-05.png
[x] page-06.png
[x] page-07.png
[x] page-08.png
[x] page-09.png
[x] page-10.png
[x] page-11.png
[x] page-12.png
[x] page-13.png
[x] page-14.png
[x] page-15.png
[x] page-16.png

## What Was Done

### 1. Formatted with Prettier (strict whitespace mode)

```bash
npx prettier --parser html --html-whitespace-sensitivity strict index.html
```

This expanded the file from 229 lines to ~20,000 lines by adding proper indentation and line breaks.

### 2. Changed CSS Whitespace Properties

Replaced whitespace-preserving CSS rules to allow the formatted HTML to render correctly:

```bash
sed 's/white-space: pre;/white-space: normal;/g'
sed 's/white-space: pre-wrap;/white-space: normal;/g'
sed 's/white-space-collapse: preserve;/white-space-collapse: collapse;/g'
```

## What Broke

Too many things to list

### Root Cause

The navigation uses letter-spaced text where each character may be in separate spans. The `white-space: normal` change causes whitespace between these elements to collapse, eating characters.

Example of how Framer structures text:
```html
<span>F</span><span>A</span><span>Q</span>
```

When formatted with newlines:
```html
<span>F</span>
<span>A</span>
<span>Q</span>
```

With `white-space: normal`, the newlines become spaces, and then collapse incorrectly.

## Plan to Fix

### Option 1: Selective CSS Override (Recommended)

Only apply `white-space: normal` to content areas, not the navigation:

1. Identify the CSS classes used by the navigation header
2. Keep `white-space: nowrap` or `white-space: pre` for those specific selectors
3. Only change whitespace for body content sections

### Option 2: Add CSS Override Block

Add a `<style>` block that:
- Sets `white-space: normal` globally
- Explicitly restores `white-space: nowrap` for nav elements

```css
/* Global fix for formatted HTML */
[data-framer-generated-page] * {
  white-space: normal;
}

/* Restore nav whitespace handling */
.framer-nav-class,
[data-framer-name="Links"] * {
  white-space: nowrap;
}
```

### Option 3: Don't Format Nav Section

Keep the navigation HTML on a single line (unformatted) while formatting everything else.

## Reference Screenshots

Original working screenshots are in `screenshots/page-*.png` for comparison.

Use `./screenshots/capture.sh after` to capture the current state for comparison.

