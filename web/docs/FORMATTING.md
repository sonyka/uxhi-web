# HTML Formatting for Conference 2025 Page

## Problem

The Framer-exported `index.html` file has extremely long lines (up to 553,000 characters on a single line), making it nearly impossible to edit or work with in any IDE.

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

## How It Was Fixed

Added a CSS override block in the HTML `<style>` section that restores `white-space: nowrap` for elements that need it:

```css
/* === WHITESPACE FIXES FOR FORMATTED HTML === */
/* Navigation menu items - restore nowrap to prevent character loss */
[data-framer-name="PrimaryMenu"] *,
[data-framer-name="Links"] *,
nav *,
.framer-1ewylku *,
.framer-c0g4u1 * {
  white-space: nowrap !important;
}

/* Room badges - prevent text wrapping */
[data-framer-name="Status"] *,
.framer-18d705h *,
.framer-15z3ipk *,
.framer-6zm3rg *,
.framer-6zm3rg {
  white-space: nowrap !important;
}
```

This approach (Option 2 from the original plan) works because:
1. The global `white-space: normal` allows the formatted HTML to render correctly in most places
2. The targeted `white-space: nowrap` rules preserve text in navigation and badges where character loss would occur

## Verification

Use `./capture.sh` to capture screenshots for visual comparison when making future changes.

