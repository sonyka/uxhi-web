#!/usr/bin/env python3
"""
Simple Conference Website Scraper

Just captures the HTML and assets without trying to interact with popovers.
Run extract_popovers.py separately to get speaker/agenda data.
"""

import hashlib
import os
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


def main():
    url = "https://uxhiconference.com/"
    output_dir = Path("../../public/conferences/2025")
    base_path = "/conferences/2025"

    print(f"Scraping {url}")
    print(f"Output directory: {output_dir}")

    # Create output directories
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "assets" / "css").mkdir(parents=True, exist_ok=True)
    (output_dir / "assets" / "js").mkdir(parents=True, exist_ok=True)
    (output_dir / "assets" / "images").mkdir(parents=True, exist_ok=True)
    (output_dir / "assets" / "fonts").mkdir(parents=True, exist_ok=True)
    (output_dir / "assets" / "data").mkdir(parents=True, exist_ok=True)

    downloaded_assets = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        )
        page = context.new_page()

        print("Loading page...")
        page.goto(url, wait_until="networkidle", timeout=60000)
        time.sleep(2)

        # Simple scroll to trigger lazy loading
        print("Scrolling page...")
        page.evaluate("""
            async () => {
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                const scrollHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                );
                const step = window.innerHeight * 0.8;

                for (let y = 0; y < scrollHeight; y += step) {
                    window.scrollTo(0, y);
                    await delay(200);
                }
                window.scrollTo(0, 0);
            }
        """)
        time.sleep(1)

        # Get HTML
        print("Getting page HTML...")
        html = page.content()

        browser.close()

    print("Processing HTML...")
    soup = BeautifulSoup(html, 'lxml')

    # Remove Framer scripts
    for script in soup.find_all('script'):
        src = script.get('src', '')
        if 'framer' in src.lower() or 'chunk' in src.lower():
            script.decompose()
        elif script.string and 'framer' in script.string.lower():
            script.decompose()

    # Download and rewrite images
    print("Downloading images...")
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src:
            local_path = download_asset(src, url, 'images', output_dir, base_path, downloaded_assets)
            if local_path:
                img['src'] = local_path
                if img.get('data-src'):
                    img['data-src'] = local_path

        # Handle srcset
        srcset = img.get('srcset')
        if srcset:
            new_parts = []
            for part in srcset.split(','):
                part = part.strip()
                if not part:
                    continue
                pieces = part.split()
                if pieces:
                    asset_url = pieces[0]
                    descriptor = pieces[1] if len(pieces) > 1 else ''
                    local_path = download_asset(asset_url, url, 'images', output_dir, base_path, downloaded_assets)
                    if local_path:
                        new_parts.append(f"{local_path} {descriptor}".strip())
            img['srcset'] = ', '.join(new_parts)

    # Download CSS
    print("Downloading CSS...")
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href')
        if href:
            local_path = download_asset(href, url, 'css', output_dir, base_path, downloaded_assets)
            if local_path:
                link['href'] = local_path

    # Process inline styles with url()
    print("Processing inline styles...")
    for element in soup.find_all(style=True):
        style = element['style']
        element['style'] = process_css_urls(style, url, output_dir, base_path, downloaded_assets)

    for style_tag in soup.find_all('style'):
        if style_tag.string:
            style_tag.string = process_css_urls(style_tag.string, url, output_dir, base_path, downloaded_assets)

    # Add our custom JavaScript
    script_tag = soup.new_tag('script', src=f"{base_path}/assets/js/interactions.js")
    soup.body.append(script_tag)

    # Save HTML
    print("Saving index.html...")
    html_path = output_dir / "index.html"
    html_path.write_text(str(soup), encoding='utf-8')

    # Create placeholder interactions.js
    print("Creating placeholder interactions.js...")
    js_content = '''
// Conference Site Interactions - 2025
// Placeholder - run extract_popovers.py to populate with real data

(function() {
    'use strict';

    // Will be populated by extract_popovers.py
    let popoverData = null;

    // Load popover data
    fetch('/conferences/2025/assets/data/popover-data.json')
        .then(r => r.json())
        .then(data => {
            popoverData = data;
            console.log('Loaded popover data:', data);
            initInteractions();
        })
        .catch(err => console.log('No popover data yet:', err));

    function initInteractions() {
        if (!popoverData) return;

        // Fix overlay blocking
        const overlay = document.getElementById('template-overlay');
        if (overlay) {
            overlay.style.pointerEvents = 'none';
            overlay.querySelectorAll('*').forEach(el => {
                el.style.pointerEvents = 'none';
            });
        }

        initSpeakerPopovers();
        initFAQAccordions();

        console.log('Conference interactions initialized');
    }

    function normalizeText(str) {
        return str
            .normalize('NFD')
            .replace(/[\\u0300-\\u036f]/g, '')
            .replace(/[\\u0027\\u2019\\u2018\\u02BB]/g, "'")
            .replace(/[\\u201C\\u201D]/g, '"')
            .replace(/\\s+/g, ' ')
            .trim();
    }

    function initSpeakerPopovers() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('[data-framer-name="Desktop"], [data-framer-name="Team Card"]');
            if (!card) return;

            const nameEl = card.querySelector('h3');
            if (!nameEl) return;

            const clickedName = normalizeText(nameEl.textContent);
            const speaker = popoverData.speakers.find(s =>
                normalizeText(s.name) === clickedName
            );

            if (speaker) {
                e.preventDefault();
                e.stopPropagation();
                showSpeakerPopover(speaker);
            }
        }, true);
    }

    function showSpeakerPopover(speaker) {
        // Remove existing popover
        const existing = document.getElementById('speaker-popover');
        if (existing) existing.remove();

        const popover = document.createElement('div');
        popover.id = 'speaker-popover';
        popover.innerHTML = `
            <div class="popover-backdrop"></div>
            <div class="popover-content">
                <button class="popover-close">&times;</button>
                <h2>${speaker.name}</h2>
                <p class="speaker-title">${speaker.title || ''}</p>
                <p class="speaker-bio">${speaker.bio || ''}</p>
                ${speaker.links ? speaker.links.map(l =>
                    `<a href="${l.href}" target="_blank" rel="noopener">${l.type}</a>`
                ).join(' ') : ''}
            </div>
        `;

        document.body.appendChild(popover);

        // Close handlers
        popover.querySelector('.popover-backdrop').onclick = () => popover.remove();
        popover.querySelector('.popover-close').onclick = () => popover.remove();
        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                popover.remove();
                document.removeEventListener('keydown', handler);
            }
        });
    }

    function initFAQAccordions() {
        document.querySelectorAll('[data-framer-name="Question"]').forEach(question => {
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const parent = question.parentElement;
                const answer = parent.querySelector('[data-framer-name="Answer"]');
                if (answer) {
                    const isHidden = answer.style.display === 'none';
                    answer.style.display = isHidden ? 'block' : 'none';
                }
            });
        });
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #speaker-popover {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .popover-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .popover-content {
            position: relative;
            background: white;
            padding: 32px;
            border-radius: 16px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .popover-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #333;
        }
        .speaker-title {
            color: #666;
            margin-bottom: 16px;
        }
        .speaker-bio {
            line-height: 1.6;
        }

        /* Fix FAQ answer width */
        [data-framer-name="Answer"] * {
            width: auto !important;
            min-width: 0 !important;
        }
    `;
    document.head.appendChild(style);
})();
'''

    js_path = output_dir / "assets" / "js" / "interactions.js"
    js_path.write_text(js_content)

    print(f"\nDone! Static site saved to {output_dir}")
    print(f"View at: http://localhost:3000{base_path}/")
    print(f"\nNext steps:")
    print(f"1. Run: uv run python extract_popovers_2025.py")
    print(f"2. Fix any missing SVG graphics manually")


def download_asset(asset_url, base_url, asset_type, output_dir, base_path, downloaded_assets):
    """Download an asset and return local path."""
    if not asset_url or asset_url.startswith('data:'):
        return asset_url

    # Make absolute URL
    if asset_url.startswith('//'):
        asset_url = 'https:' + asset_url
    elif asset_url.startswith('/'):
        asset_url = urljoin(base_url, asset_url)
    elif not asset_url.startswith('http'):
        asset_url = urljoin(base_url, asset_url)

    # Check if already downloaded
    if asset_url in downloaded_assets:
        return downloaded_assets[asset_url]

    try:
        response = requests.get(asset_url, timeout=30, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        })
        response.raise_for_status()

        # Generate filename
        url_hash = hashlib.md5(asset_url.encode()).hexdigest()[:12]
        ext = get_extension(asset_url, response.headers.get('content-type', ''))
        filename = f"{url_hash}{ext}"

        # Save file
        local_path = output_dir / "assets" / asset_type / filename
        local_path.write_bytes(response.content)

        # Return path relative to base
        relative_path = f"{base_path}/assets/{asset_type}/{filename}"
        downloaded_assets[asset_url] = relative_path

        return relative_path

    except Exception as e:
        print(f"  Warning: Failed to download {asset_url}: {e}")
        return None


def get_extension(url, content_type):
    """Get file extension from URL or content type."""
    parsed = urlparse(url)
    path = parsed.path
    if '.' in path:
        ext = '.' + path.rsplit('.', 1)[-1].split('?')[0]
        if len(ext) <= 5:
            return ext

    type_map = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
        'text/css': '.css',
        'application/javascript': '.js',
        'font/woff': '.woff',
        'font/woff2': '.woff2',
    }

    for mime, ext in type_map.items():
        if mime in content_type:
            return ext

    return ''


def process_css_urls(css, base_url, output_dir, base_path, downloaded_assets):
    """Process url() references in CSS."""
    def replace_url(match):
        url = match.group(1).strip('"\'')
        local_path = download_asset(url, base_url, 'images', output_dir, base_path, downloaded_assets)
        return f"url({local_path})" if local_path else match.group(0)

    return re.sub(r'url\(([^)]+)\)', replace_url, css)


if __name__ == "__main__":
    main()
