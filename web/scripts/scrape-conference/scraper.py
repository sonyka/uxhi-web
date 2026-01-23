#!/usr/bin/env python3
"""
Conference Website Scraper

Scrapes Framer-hosted conference websites and converts them to static sites.
Captures interactive elements (popovers, accordions) and recreates them with custom JS.

Usage:
    uv run python scraper.py --url https://uxhiconference.com/2024 --output ../../public/conferences/2024
"""

import argparse
import hashlib
import json
import os
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, Page, TimeoutError as PlaywrightTimeout


class ConferenceScraper:
    def __init__(self, url: str, output_dir: str, base_path: str | None = None):
        self.url = url
        self.output_dir = Path(output_dir)
        self.base_path = base_path or self._infer_base_path()
        self.assets_dir = self.output_dir / "assets"
        self.downloaded_assets: dict[str, str] = {}  # original_url -> local_path
        self.speaker_data: list[dict] = []
        self.agenda_data: list[dict] = []
        self.faq_data: list[dict] = []

    def _infer_base_path(self) -> str:
        """Infer base path from output directory."""
        # If output is .../public/conferences/2024, base path is /conferences/2024
        parts = self.output_dir.parts
        try:
            public_idx = parts.index("public")
            return "/" + "/".join(parts[public_idx + 1:])
        except ValueError:
            return "/"

    def run(self):
        """Main entry point."""
        print(f"Scraping {self.url}")
        print(f"Output directory: {self.output_dir}")
        print(f"Base path: {self.base_path}")

        # Create output directories
        self.output_dir.mkdir(parents=True, exist_ok=True)
        (self.assets_dir / "css").mkdir(parents=True, exist_ok=True)
        (self.assets_dir / "js").mkdir(parents=True, exist_ok=True)
        (self.assets_dir / "images").mkdir(parents=True, exist_ok=True)
        (self.assets_dir / "fonts").mkdir(parents=True, exist_ok=True)

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=False)
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
            )
            page = context.new_page()

            # Load page and wait for dynamic content
            print("Loading page...")
            page.goto(self.url, wait_until="networkidle", timeout=60000)
            time.sleep(2)  # Extra wait for Framer animations

            # Scroll through page to trigger lazy loading
            print("Scrolling to trigger lazy content...")
            self._scroll_page(page)

            # Fix overlay blocking before capturing
            print("Fixing overlay blocking...")
            self._fix_overlay_blocking(page)

            # Capture interactive elements
            print("Capturing agenda popovers...")
            self._capture_agenda_popovers(page)

            print("Capturing speaker popovers...")
            self._capture_speaker_popovers(page)

            print("Capturing FAQ accordions...")
            self._capture_faq_accordions(page)

            # Get final HTML
            print("Getting page HTML...")
            html = page.content()

            browser.close()

        # Process and save
        print("Processing HTML and downloading assets...")
        processed_html = self._process_html(html)

        # Generate interaction JavaScript
        print("Generating interaction JavaScript...")
        self._generate_interactions_js()

        # Save final HTML
        print("Saving index.html...")
        self._save_html(processed_html)

        print(f"\nDone! Static site saved to {self.output_dir}")
        print(f"View at: http://localhost:3000{self.base_path}/")

    def _scroll_page(self, page: Page):
        """Scroll through page to trigger lazy loading."""
        page.evaluate("""
            async () => {
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                const scrollHeight = document.documentElement.scrollHeight;
                const viewportHeight = window.innerHeight;

                for (let y = 0; y < scrollHeight; y += viewportHeight * 0.8) {
                    window.scrollTo(0, y);
                    await delay(300);
                }

                // Scroll back to top
                window.scrollTo(0, 0);
                await delay(500);
            }
        """)
        time.sleep(1)

    def _fix_overlay_blocking(self, page: Page):
        """Disable pointer events on Framer overlay elements that block interactions."""
        page.evaluate("""
            () => {
                // Fix template-overlay which blocks all clicks
                const overlay = document.getElementById('template-overlay');
                if (overlay) {
                    overlay.style.pointerEvents = 'none';
                    overlay.querySelectorAll('*').forEach(el => {
                        el.style.pointerEvents = 'none';
                    });
                    console.log('Fixed template-overlay pointer events');
                }

                // Also fix any other overlays with similar patterns
                document.querySelectorAll('[id*="overlay"], [class*="overlay"]').forEach(el => {
                    if (el.style.position === 'fixed' || el.style.position === 'absolute') {
                        el.style.pointerEvents = 'none';
                    }
                });
            }
        """)

    def _capture_agenda_popovers(self, page: Page):
        """Capture agenda session tooltips."""
        # Find agenda items using Framer's data attributes
        agenda_items = page.query_selector_all('[data-framer-name="Agenda Content"]')

        print(f"  Found {len(agenda_items)} agenda items to check")

        for i, item in enumerate(agenda_items):
            try:
                # Get the session title text
                title_el = item.query_selector('h2, h3, h4, [data-framer-component-type="RichTextContainer"]')
                if not title_el:
                    continue

                title_text = title_el.inner_text().strip()
                if not title_text or len(title_text) > 200:
                    continue

                # Try clicking the title to see if tooltip appears
                try:
                    title_el.click(timeout=3000, force=True)
                except PlaywrightTimeout:
                    continue
                time.sleep(0.6)

                # Check for any new visible overlay/tooltip
                tooltip = page.query_selector('[role="tooltip"], [data-framer-name*="Tooltip"], [data-framer-name*="Popup"]')

                if tooltip and tooltip.is_visible():
                    tooltip_html = tooltip.inner_html()
                    tooltip_text = tooltip.inner_text()

                    self.agenda_data.append({
                        "id": f"agenda-{i}",
                        "trigger_text": title_text[:100],
                        "content_html": tooltip_html,
                        "content_text": tooltip_text
                    })

                    # Close by pressing Escape or clicking elsewhere
                    page.keyboard.press("Escape")
                    time.sleep(0.3)

            except Exception as e:
                print(f"    Warning: Error on agenda item {i}: {e}")
                continue

        print(f"  Captured {len(self.agenda_data)} agenda tooltips")

    def _capture_speaker_popovers(self, page: Page):
        """Capture speaker card popovers."""
        # Scroll to lineup section
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.4)")
        time.sleep(0.5)

        # Find speaker cards using Framer's Team Card data attribute
        speaker_cards = page.query_selector_all('[data-framer-name="Team Card"]')

        print(f"  Found {len(speaker_cards)} speaker cards to check")

        for i, card in enumerate(speaker_cards):
            try:
                # Get speaker name from card before clicking
                name_el = card.query_selector('[data-framer-name="Name Title"], h2, h3, h4')
                speaker_name = name_el.inner_text().strip() if name_el else f"Speaker {i}"

                # Store card HTML
                card_html = card.inner_html()

                # Click the card to open popover
                card.scroll_into_view_if_needed()
                time.sleep(0.2)
                card.click()
                time.sleep(0.8)

                # Look for popover that appeared - Framer often uses opacity/visibility changes
                # Check for any element that appeared with speaker bio content
                popover = page.query_selector(
                    '[data-framer-name*="Popup"], [data-framer-name*="Modal"], '
                    '[data-framer-name*="Overlay"], [data-framer-name*="Bio"]'
                )

                # Also check for elements that contain the speaker name and more text (bio)
                if not popover or not popover.is_visible():
                    # Try finding by looking for a newly visible container with bio-like content
                    all_overlays = page.query_selector_all('[style*="opacity: 1"][style*="pointer-events: auto"]')
                    for overlay in all_overlays:
                        text = overlay.inner_text()
                        if speaker_name in text and len(text) > len(speaker_name) + 50:
                            popover = overlay
                            break

                if popover and popover.is_visible():
                    popover_html = popover.inner_html()
                    popover_text = popover.inner_text()

                    self.speaker_data.append({
                        "id": f"speaker-{i}",
                        "name": speaker_name,
                        "card_html": card_html[:500],  # Truncate card HTML
                        "popover_html": popover_html,
                        "popover_text": popover_text
                    })

                    print(f"    Captured: {speaker_name}")

                # Close popover by pressing Escape or clicking outside
                page.keyboard.press("Escape")
                time.sleep(0.3)
                # Also click outside just in case
                page.mouse.click(10, 10)
                time.sleep(0.3)

            except Exception as e:
                print(f"    Warning: Error on speaker {i}: {e}")
                continue

        print(f"  Captured {len(self.speaker_data)} speaker popovers")

    def _capture_faq_accordions(self, page: Page):
        """Capture FAQ accordion content."""
        # Navigate to FAQ section
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.8)")
        time.sleep(0.5)

        # Find FAQ items using Framer's Question data attribute
        faq_questions = page.query_selector_all('[data-framer-name="Question"]')

        print(f"  Found {len(faq_questions)} FAQ questions to check")

        for i, question_el in enumerate(faq_questions):
            try:
                # Get the question text
                question_text = question_el.inner_text().strip()

                if not question_text:
                    continue

                # Find the parent container that includes the answer
                # The answer is likely a sibling with data-framer-name="Answer"
                parent = question_el.evaluate_handle('el => el.parentElement')
                answer_el = page.query_selector(f'[data-framer-name="Answer"]')

                # Click to expand the FAQ item
                question_el.click()
                time.sleep(0.5)

                # After clicking, the answer should be visible
                # Try to get the answer from the sibling or parent container
                if answer_el:
                    answer_html = answer_el.inner_html()
                    answer_text = answer_el.inner_text().strip()
                else:
                    # If no separate answer element, get from parent
                    parent_html = parent.inner_html() if parent else ""
                    answer_html = parent_html
                    answer_text = parent.inner_text() if parent else ""

                self.faq_data.append({
                    "id": f"faq-{i}",
                    "question": question_text[:200],
                    "answer_html": answer_html,
                    "answer_text": answer_text
                })

                print(f"    Captured: {question_text[:50]}...")

                # Click again to collapse
                question_el.click()
                time.sleep(0.3)

            except Exception as e:
                print(f"    Warning: Error on FAQ {i}: {e}")
                continue

        print(f"  Captured {len(self.faq_data)} FAQ items")

    def _process_html(self, html: str) -> str:
        """Process HTML: download assets, rewrite URLs."""
        soup = BeautifulSoup(html, 'lxml')

        # Remove Framer-specific scripts that won't work
        for script in soup.find_all('script'):
            src = script.get('src', '')
            if 'framer' in src.lower() or 'chunk' in src.lower():
                script.decompose()
            elif script.string and 'framer' in script.string.lower():
                script.decompose()

        # Process images
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src:
                local_path = self._download_asset(src, 'images')
                if local_path:
                    img['src'] = local_path
                    img['data-src'] = local_path

            # Handle srcset
            srcset = img.get('srcset')
            if srcset:
                new_srcset = self._process_srcset(srcset)
                img['srcset'] = new_srcset

        # Process CSS links
        for link in soup.find_all('link', rel='stylesheet'):
            href = link.get('href')
            if href:
                local_path = self._download_asset(href, 'css')
                if local_path:
                    link['href'] = local_path

        # Process inline styles with url()
        for element in soup.find_all(style=True):
            style = element['style']
            new_style = self._process_css_urls(style)
            element['style'] = new_style

        # Process style tags
        for style_tag in soup.find_all('style'):
            if style_tag.string:
                style_tag.string = self._process_css_urls(style_tag.string)

        # Add our custom JavaScript
        script_tag = soup.new_tag('script', src=f"{self.base_path}/assets/js/interactions.js")
        soup.body.append(script_tag)

        # Add data attributes for interactive elements
        self._add_interactive_data(soup)

        # Fix internal links
        for a in soup.find_all('a'):
            href = a.get('href', '')
            if href.startswith('#'):
                continue  # Keep anchor links
            if urlparse(href).netloc in ['', urlparse(self.url).netloc]:
                # Internal link - update to new base path
                if href.startswith('/'):
                    a['href'] = self.base_path + href

        return str(soup)

    def _download_asset(self, url: str, asset_type: str) -> str | None:
        """Download an asset and return local path."""
        if not url or url.startswith('data:'):
            return url

        # Make absolute URL
        if url.startswith('//'):
            url = 'https:' + url
        elif url.startswith('/'):
            url = urljoin(self.url, url)
        elif not url.startswith('http'):
            url = urljoin(self.url, url)

        # Check if already downloaded
        if url in self.downloaded_assets:
            return self.downloaded_assets[url]

        try:
            response = requests.get(url, timeout=30, headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
            })
            response.raise_for_status()

            # Generate filename from URL hash + extension
            url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
            ext = self._get_extension(url, response.headers.get('content-type', ''))
            filename = f"{url_hash}{ext}"

            # Save file
            local_path = self.assets_dir / asset_type / filename
            local_path.write_bytes(response.content)

            # Return path relative to base
            relative_path = f"{self.base_path}/assets/{asset_type}/{filename}"
            self.downloaded_assets[url] = relative_path

            return relative_path

        except Exception as e:
            print(f"  Warning: Failed to download {url}: {e}")
            return None

    def _get_extension(self, url: str, content_type: str) -> str:
        """Get file extension from URL or content type."""
        # Try from URL
        parsed = urlparse(url)
        path = parsed.path
        if '.' in path:
            ext = '.' + path.rsplit('.', 1)[-1].split('?')[0]
            if len(ext) <= 5:
                return ext

        # Try from content type
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

    def _process_srcset(self, srcset: str) -> str:
        """Process srcset attribute, downloading each image."""
        parts = []
        for part in srcset.split(','):
            part = part.strip()
            if not part:
                continue

            pieces = part.split()
            if pieces:
                url = pieces[0]
                descriptor = pieces[1] if len(pieces) > 1 else ''

                local_path = self._download_asset(url, 'images')
                if local_path:
                    parts.append(f"{local_path} {descriptor}".strip())

        return ', '.join(parts)

    def _process_css_urls(self, css: str) -> str:
        """Process url() references in CSS."""
        def replace_url(match):
            url = match.group(1).strip('"\'')
            local_path = self._download_asset(url, 'images')
            return f"url({local_path})" if local_path else match.group(0)

        return re.sub(r'url\(([^)]+)\)', replace_url, css)

    def _add_interactive_data(self, soup: BeautifulSoup):
        """Add data attributes for JavaScript interactions."""
        # This would add data-* attributes to elements for our JS to use
        # The actual implementation depends on the specific Framer structure
        pass

    def _generate_interactions_js(self):
        """Generate JavaScript for interactive elements."""
        js_content = '''
// Conference Site Interactions
// Auto-generated - handles popovers, tooltips, and accordions

(function() {
    'use strict';

    // Speaker Popovers
    const speakerData = SPEAKER_DATA_PLACEHOLDER;

    // Agenda Tooltips
    const agendaData = AGENDA_DATA_PLACEHOLDER;

    // FAQ Accordions
    const faqData = FAQ_DATA_PLACEHOLDER;

    // Create popover container
    const popoverContainer = document.createElement('div');
    popoverContainer.id = 'popover-container';
    popoverContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 10000;
        justify-content: center;
        align-items: center;
    `;
    document.body.appendChild(popoverContainer);

    const popoverContent = document.createElement('div');
    popoverContent.id = 'popover-content';
    popoverContent.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 12px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    popoverContainer.appendChild(popoverContent);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
    `;
    closeBtn.onclick = closePopover;
    popoverContent.appendChild(closeBtn);

    function showPopover(html) {
        popoverContent.innerHTML = html + closeBtn.outerHTML;
        popoverContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closePopover() {
        popoverContainer.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Close on backdrop click
    popoverContainer.addEventListener('click', (e) => {
        if (e.target === popoverContainer) {
            closePopover();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopover();
            closeAllTooltips();
        }
    });

    // Tooltip container
    const tooltipEl = document.createElement('div');
    tooltipEl.id = 'tooltip';
    tooltipEl.style.cssText = `
        position: fixed;
        background: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        z-index: 9999;
        display: none;
    `;
    document.body.appendChild(tooltipEl);

    function showTooltip(html, x, y) {
        tooltipEl.innerHTML = html;
        tooltipEl.style.display = 'block';

        // Position tooltip
        const rect = tooltipEl.getBoundingClientRect();
        let left = x;
        let top = y + 10;

        // Keep in viewport
        if (left + rect.width > window.innerWidth) {
            left = window.innerWidth - rect.width - 10;
        }
        if (top + rect.height > window.innerHeight) {
            top = y - rect.height - 10;
        }

        tooltipEl.style.left = left + 'px';
        tooltipEl.style.top = top + 'px';
    }

    function closeAllTooltips() {
        tooltipEl.style.display = 'none';
    }

    // Click outside to close tooltip
    document.addEventListener('click', (e) => {
        if (!tooltipEl.contains(e.target)) {
            closeAllTooltips();
        }
    });

    // FAQ Accordion functionality
    document.querySelectorAll('[class*="faq"], [class*="accordion"]').forEach(item => {
        const trigger = item.querySelector('[class*="question"], [class*="header"]') || item;
        const content = item.querySelector('[class*="answer"], [class*="content"], [class*="body"]');

        if (trigger && content) {
            // Initially collapse
            content.style.display = 'none';

            trigger.style.cursor = 'pointer';
            trigger.addEventListener('click', () => {
                const isExpanded = content.style.display !== 'none';
                content.style.display = isExpanded ? 'none' : 'block';

                // Toggle icon if present
                const icon = trigger.querySelector('svg, [class*="icon"]');
                if (icon) {
                    icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(45deg)';
                }
            });
        }
    });

    // Initialize speaker card clicks
    document.querySelectorAll('[class*="speaker"], [class*="team"]').forEach((card, i) => {
        if (card.querySelector('img')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const data = speakerData[i];
                if (data && data.popover_html) {
                    showPopover(data.popover_html);
                }
            });
        }
    });

    console.log('Conference interactions initialized');
})();
'''

        # Replace placeholders with actual data
        js_content = js_content.replace(
            'SPEAKER_DATA_PLACEHOLDER',
            json.dumps(self.speaker_data, indent=2)
        )
        js_content = js_content.replace(
            'AGENDA_DATA_PLACEHOLDER',
            json.dumps(self.agenda_data, indent=2)
        )
        js_content = js_content.replace(
            'FAQ_DATA_PLACEHOLDER',
            json.dumps(self.faq_data, indent=2)
        )

        # Save JS file
        js_path = self.assets_dir / "js" / "interactions.js"
        js_path.write_text(js_content)
        print(f"  Saved {js_path}")

    def _save_html(self, html: str):
        """Save the processed HTML file."""
        html_path = self.output_dir / "index.html"
        html_path.write_text(html, encoding='utf-8')
        print(f"  Saved {html_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Scrape a Framer conference website for static serving"
    )
    parser.add_argument(
        "--url",
        required=True,
        help="URL of the conference website to scrape"
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Output directory for static files"
    )
    parser.add_argument(
        "--base-path",
        help="Base path for URL rewriting (default: inferred from output)"
    )

    args = parser.parse_args()

    scraper = ConferenceScraper(
        url=args.url,
        output_dir=args.output,
        base_path=args.base_path
    )
    scraper.run()


if __name__ == "__main__":
    main()
