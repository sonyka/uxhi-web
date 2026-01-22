#!/bin/bash
#
# Capture viewport-sized screenshots of the conference 2024 page
# Usage: ./capture.sh [output_prefix]
#
# Examples:
#   ./capture.sh                  # Creates page-00.png, page-01.png, etc.
#   ./capture.sh before           # Creates before-00.png, before-01.png, etc.
#   ./capture.sh after            # Creates after-00.png, after-01.png, etc.
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PREFIX="${1:-page}"
URL="http://localhost:3000/conferences/2024/index.html"
VIEWPORT_WIDTH=1492
VIEWPORT_HEIGHT=824
TEMP_FILE="$SCRIPT_DIR/.full-page-temp.png"

echo "Capturing screenshots with prefix: $PREFIX"

# Check dependencies
if ! command -v npx &> /dev/null; then
    echo "Error: npx not found. Please install Node.js."
    exit 1
fi

if ! command -v convert &> /dev/null && ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick not found. Please install it (brew install imagemagick)."
    exit 1
fi

# Use magick if available (IMv7), otherwise fall back to convert (IMv6)
if command -v magick &> /dev/null; then
    CONVERT_CMD="magick"
else
    CONVERT_CMD="convert"
fi

# Check if server is running
if ! curl -s --head "$URL" > /dev/null 2>&1; then
    echo "Error: Cannot reach $URL"
    echo "Make sure the dev server is running (npm run dev)"
    exit 1
fi

# Capture full page screenshot
echo "Capturing full page..."
npx playwright screenshot \
    --viewport-size=${VIEWPORT_WIDTH},${VIEWPORT_HEIGHT} \
    --full-page \
    "$URL" \
    "$TEMP_FILE" 2>/dev/null

if [ ! -f "$TEMP_FILE" ]; then
    echo "Error: Failed to capture screenshot"
    exit 1
fi

# Remove existing screenshots with this prefix
rm -f "$SCRIPT_DIR/${PREFIX}-"*.png

# Split into viewport-sized chunks
echo "Splitting into viewport sections..."
$CONVERT_CMD "$TEMP_FILE" -crop ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT} +repage "$SCRIPT_DIR/${PREFIX}-%02d.png"

# Remove the last image if it's too small (less than 50% of viewport height)
LAST_FILE=$(ls -1 "$SCRIPT_DIR/${PREFIX}-"*.png | tail -1)
if [ -f "$LAST_FILE" ]; then
    LAST_HEIGHT=$($CONVERT_CMD "$LAST_FILE" -format "%h" info: 2>/dev/null || identify -format "%h" "$LAST_FILE")
    MIN_HEIGHT=$((VIEWPORT_HEIGHT / 2))
    if [ "$LAST_HEIGHT" -lt "$MIN_HEIGHT" ]; then
        echo "Removing partial last section ($LAST_HEIGHT px)"
        rm "$LAST_FILE"
    fi
fi

# Cleanup
rm -f "$TEMP_FILE"

# Report results
COUNT=$(ls -1 "$SCRIPT_DIR/${PREFIX}-"*.png 2>/dev/null | wc -l | tr -d ' ')
echo "Done! Created $COUNT screenshots:"
ls -1 "$SCRIPT_DIR/${PREFIX}-"*.png
