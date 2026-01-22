#!/bin/bash
#
# Capture viewport-sized screenshots of a page
# Usage: ./capture.sh [options] [url]
#
# Options:
#   -p, --prefix PREFIX    Output prefix (default: page)
#   -o, --output DIR       Output directory (default: current directory)
#   -w, --width WIDTH      Viewport width (default: 1492)
#   -h, --height HEIGHT    Viewport height (default: 824)
#
# Examples:
#   ./capture.sh                                    # Captures localhost:3000, creates page-00.png, etc.
#   ./capture.sh http://localhost:3000/about        # Captures specific page
#   ./capture.sh -p before /conferences/2024        # Creates before-00.png for path
#   ./capture.sh -p after -o ./screenshots /page    # Output to specific directory
#

set -e

# Defaults
PREFIX="page"
OUTPUT_DIR="."
VIEWPORT_WIDTH=1492
VIEWPORT_HEIGHT=824
BASE_URL="http://localhost:3000"
URL=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--prefix)
            PREFIX="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -w|--width)
            VIEWPORT_WIDTH="$2"
            shift 2
            ;;
        -h|--height)
            VIEWPORT_HEIGHT="$2"
            shift 2
            ;;
        --help)
            echo "Usage: ./capture.sh [options] [url]"
            echo ""
            echo "Options:"
            echo "  -p, --prefix PREFIX    Output prefix (default: page)"
            echo "  -o, --output DIR       Output directory (default: current directory)"
            echo "  -w, --width WIDTH      Viewport width (default: 1492)"
            echo "  -h, --height HEIGHT    Viewport height (default: 824)"
            echo ""
            echo "URL can be:"
            echo "  - Full URL: http://localhost:3000/page"
            echo "  - Path only: /conferences/2024 (uses localhost:3000 as base)"
            echo "  - Omitted: defaults to http://localhost:3000"
            exit 0
            ;;
        -*)
            echo "Unknown option: $1"
            exit 1
            ;;
        *)
            URL="$1"
            shift
            ;;
    esac
done

# Build full URL
if [ -z "$URL" ]; then
    URL="$BASE_URL"
elif [[ "$URL" != http://* ]] && [[ "$URL" != https://* ]]; then
    # It's a path, prepend base URL
    URL="${BASE_URL}${URL}"
fi

# Resolve output directory to absolute path
OUTPUT_DIR="$(cd "$OUTPUT_DIR" 2>/dev/null && pwd)" || {
    echo "Error: Output directory does not exist: $OUTPUT_DIR"
    exit 1
}

TEMP_FILE="$OUTPUT_DIR/.full-page-temp.png"

echo "Capturing: $URL"
echo "Output: $OUTPUT_DIR/${PREFIX}-*.png"
echo "Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}"

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

# Get the full page dimensions
FULL_HEIGHT=$($CONVERT_CMD "$TEMP_FILE" -format "%h" info: 2>/dev/null || identify -format "%h" "$TEMP_FILE")
FULL_WIDTH=$($CONVERT_CMD "$TEMP_FILE" -format "%w" info: 2>/dev/null || identify -format "%w" "$TEMP_FILE")
echo "Full page size: ${FULL_WIDTH}x${FULL_HEIGHT}"

# Calculate expected number of screenshots
EXPECTED_COUNT=$(( (FULL_HEIGHT + VIEWPORT_HEIGHT - 1) / VIEWPORT_HEIGHT ))
echo "Expected sections: $EXPECTED_COUNT"

# Remove existing screenshots with this prefix
rm -f "$OUTPUT_DIR/${PREFIX}-"*.png

# Split into viewport-sized chunks
echo "Splitting into viewport sections..."
$CONVERT_CMD "$TEMP_FILE" -crop ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT} +repage "$OUTPUT_DIR/${PREFIX}-%02d.png"

# Remove the last image if it's too small (less than 50% of viewport height)
LAST_FILE=$(ls -1 "$OUTPUT_DIR/${PREFIX}-"*.png 2>/dev/null | tail -1)
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
COUNT=$(ls -1 "$OUTPUT_DIR/${PREFIX}-"*.png 2>/dev/null | wc -l | tr -d ' ')
echo "Done! Created $COUNT screenshots:"
ls -1 "$OUTPUT_DIR/${PREFIX}-"*.png
