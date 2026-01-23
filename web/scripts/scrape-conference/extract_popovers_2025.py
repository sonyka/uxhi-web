#!/usr/bin/env python3
"""
Extract speaker and agenda popover data from the 2025 Framer conference site.
"""

import json
import time
import os
from playwright.sync_api import sync_playwright


def fix_overlay_blocking(page):
    """Disable pointer events on overlay elements that block clicks."""
    page.evaluate("""
        () => {
            const overlay = document.getElementById('template-overlay');
            if (overlay) {
                overlay.style.pointerEvents = 'none';
                overlay.querySelectorAll('*').forEach(el => {
                    el.style.pointerEvents = 'none';
                });
                console.log('Fixed template-overlay');
            }
        }
    """)


def extract_speakers_and_bios(page):
    """Extract all speaker data including bios by clicking on each speaker."""

    fix_overlay_blocking(page)

    # First, scroll to speakers section - look for Team Card elements
    page.evaluate("""() => {
        const teamCards = document.querySelectorAll('[data-framer-name="Team Card"]');
        if (teamCards.length > 0) {
            teamCards[0].scrollIntoView({ behavior: 'instant', block: 'center' });
        }
    }""")
    time.sleep(1)

    # The 2025 site has speaker names as data-framer-name attributes directly
    # e.g., data-framer-name="Arleen Fernando", data-framer-name="Chris Ota", etc.
    speaker_names = page.evaluate("""() => {
        const speakers = [];
        const knownSpeakers = [
            'Arleen Fernando', 'Chris Ota', 'David Sharek, PhD', 'Gustavo',
            'Jenn', 'Karli', 'Kaulana Mahina', 'Kim', 'Krizel Tomines',
            'Micah', 'Michelle Tran', 'Sage Suzuki', 'Sean', 'Taryn',
            'Yan Vishnepolsky', 'YiTing'
        ];

        // Method 1: Look for data-framer-name matching known speaker names
        document.querySelectorAll('[data-framer-name]').forEach(el => {
            const name = el.getAttribute('data-framer-name');
            if (knownSpeakers.includes(name) && !speakers.includes(name)) {
                speakers.push(name);
            }
        });

        // Method 2: Also check Team Card h3 elements as backup
        document.querySelectorAll('[data-framer-name="Team Card"] h3').forEach(h3 => {
            const name = h3.textContent.trim();
            if (name && name.length < 50 && name.length > 2 && !speakers.includes(name)) {
                speakers.push(name);
            }
        });

        return speakers;
    }""")

    print(f"Found {len(speaker_names)} speakers")
    speakers = []

    for name in speaker_names:
        try:
            # Press Escape to close any existing popover
            page.keyboard.press("Escape")
            time.sleep(0.3)

            fix_overlay_blocking(page)

            # Find the speaker element and click on it
            clicked = False

            try:
                # Try clicking by data-framer-name attribute first
                escaped_name = name.replace("'", "\\'")
                clicked = page.evaluate(f"""() => {{
                    // First try: element with speaker name as data-framer-name
                    let el = document.querySelector('[data-framer-name="{escaped_name}"]');
                    if (el) {{
                        el.click();
                        return true;
                    }}

                    // Second try: Team Card with h3 containing name
                    const containers = document.querySelectorAll('[data-framer-name="Team Card"]');
                    for (const container of containers) {{
                        const h3 = container.querySelector('h3');
                        if (h3 && h3.textContent.trim() === "{escaped_name}") {{
                            h3.click();
                            return true;
                        }}
                    }}

                    return false;
                }}""")
                time.sleep(1.5)  # Wait for Framer animation
            except Exception as click_error:
                print(f"    Click error for {name}: {click_error}")

            if clicked:
                # Extract data from the expanded card
                escaped_name = name.replace("'", "\\'")
                data = page.evaluate(f"""() => {{
                    let result = {{ name: "{escaped_name}", title: '', bio: '', links: [], imageUrl: '', debug: {{}} }};

                    // Look for expanded speaker info - could be a modal, expanded card, or overlay
                    // Check for visible elements that might contain bio info
                    const allContainers = [
                        ...document.querySelectorAll('[data-framer-name="Team Card"]'),
                        ...document.querySelectorAll('[data-framer-name="Desktop"]'),
                        ...document.querySelectorAll('[data-framer-name="{escaped_name}"]')
                    ];

                    let maxWidth = 0;
                    let bestContainer = null;

                    // Find the widest visible container (likely the expanded one)
                    for (const container of allContainers) {{
                        const rect = container.getBoundingClientRect();
                        // Must be visible
                        if (rect.width === 0 || rect.height === 0) continue;

                        // Check if this container has the speaker name
                        const hasName = container.textContent.includes("{escaped_name}") ||
                                       container.getAttribute('data-framer-name') === "{escaped_name}";
                        if (!hasName) continue;

                        if (rect.width > maxWidth) {{
                            maxWidth = rect.width;
                            bestContainer = container;
                        }}
                    }}

                    result.debug.maxWidth = maxWidth;

                    if (!bestContainer) {{
                        result.debug.error = 'No container found';
                        return result;
                    }}

                    const container = bestContainer;

                    // Get title from Role element or first p
                    const roleEl = container.querySelector('[data-framer-name="Role"]');
                    if (roleEl) {{
                        result.title = roleEl.textContent.trim();
                    }} else {{
                        const paragraphs = [...container.querySelectorAll('p')];
                        if (paragraphs.length > 0) {{
                            result.title = paragraphs[0].textContent.trim();
                        }}
                    }}

                    // Get links
                    container.querySelectorAll('a[href]').forEach(a => {{
                        const href = a.href;
                        if (!href || href.startsWith('javascript:')) return;
                        let type = 'website';
                        if (href.includes('linkedin')) type = 'linkedin';
                        else if (href.includes('instagram')) type = 'instagram';
                        else if (href.includes('twitter') || href.includes('x.com')) type = 'twitter';
                        result.links.push({{ href, type }});
                    }});

                    // Get image
                    const img = container.querySelector('img');
                    result.imageUrl = img ? img.src : '';

                    // Get bio - look for longer text in expanded area
                    const allText = [];
                    container.querySelectorAll('h3, p, span, div').forEach(el => {{
                        if (el.children.length === 0 || el.tagName === 'P' || el.tagName === 'SPAN') {{
                            const text = el.textContent.trim();
                            if (text.length > 60 && !text.includes("{escaped_name}")) {{
                                allText.push(text);
                            }}
                        }}
                    }});
                    result.bio = allText.join(' ').trim();
                    result.debug.paragraphCount = allText.length;

                    return result;
                }}""")

                speakers.append(data)
                debug = data.get('debug', {})
                bio_preview = data['bio'][:50] + '...' if len(data.get('bio', '')) > 50 else data.get('bio', '')
                print(f"  {name}: width={debug.get('maxWidth', 0)}, paras={debug.get('paragraphCount', 0)}, bio={bio_preview or '(none)'}")
            else:
                print(f"  Could not click on {name}")
                speakers.append({'name': name, 'title': '', 'bio': '', 'links': [], 'imageUrl': ''})

        except Exception as e:
            print(f"  Error with {name}: {e}")
            speakers.append({'name': name, 'title': '', 'bio': '', 'links': [], 'imageUrl': ''})

    return speakers


def extract_agenda(page):
    """Extract agenda session data from the visible page structure."""

    fix_overlay_blocking(page)

    # Scroll to agenda section
    page.evaluate("""() => {
        const heading = [...document.querySelectorAll('h2')].find(h => h.textContent === 'Agenda');
        if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    }""")
    time.sleep(1)

    # Extract agenda
    agenda = page.evaluate("""() => {
        const sessions = [];

        // Find agenda items using Framer's Agenda Content data attribute
        const agendaItems = document.querySelectorAll('[data-framer-name="Agenda Content"]');

        agendaItems.forEach((item, i) => {
            const session = {
                time: '',
                room: '',
                type: '',
                title: '',
                speaker: '',
                description: ''
            };

            // Get all text content from this agenda item
            const texts = [];
            item.querySelectorAll('*').forEach(el => {
                if (el.children.length === 0) {
                    const t = el.textContent.trim();
                    if (t && t.length < 200) texts.push(t);
                }
            });

            // Parse the text content
            const timePattern = /^\\d{1,2}:\\d{2}\\s*(am|pm)$/i;
            const rooms = ['Main Room', 'Purple Box', 'Room A', 'Room B'];
            const types = ['keynote', 'talk', 'panel', 'workshop', 'networking', 'lunch', 'break'];

            for (const text of texts) {
                const lowerText = text.toLowerCase();

                if (timePattern.test(text)) {
                    session.time = text;
                } else if (rooms.some(r => text === r)) {
                    session.room = text;
                } else if (types.includes(lowerText)) {
                    session.type = lowerText;
                } else if (!session.title && text.length > 3 && text.length < 100) {
                    session.title = text;
                } else if (session.title && !session.speaker && text.length > 3 && text.length < 50) {
                    session.speaker = text;
                }
            }

            if (session.title) {
                sessions.push(session);
            }
        });

        // Sort by time
        sessions.sort((a, b) => {
            const parseTime = (t) => {
                const match = t.match(/(\\d+):(\\d+)\\s*(am|pm)/i);
                if (!match) return 0;
                let hours = parseInt(match[1]);
                const mins = parseInt(match[2]);
                const isPM = match[3].toLowerCase() === 'pm';
                if (isPM && hours !== 12) hours += 12;
                if (!isPM && hours === 12) hours = 0;
                return hours * 60 + mins;
            };
            return parseTime(a.time) - parseTime(b.time);
        });

        return sessions;
    }""")

    print(f"Found {len(agenda)} agenda sessions")
    for s in agenda:
        title = s.get('title', '')[:40]
        print(f"  {s['time']}: {title}...")

    return agenda


def main():
    print("Starting 2025 popover data extraction...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        print("Loading conference page...")
        page.goto("https://uxhiconference.com/", wait_until="networkidle", timeout=60000)
        time.sleep(3)

        # Extract agenda first
        print("\n=== Extracting Agenda Data ===")
        agenda = extract_agenda(page)

        # Then extract speakers
        print("\n=== Extracting Speaker Data ===")
        speakers = extract_speakers_and_bios(page)

        browser.close()

    # Save data to JSON file
    output_data = {
        'speakers': speakers,
        'agenda': agenda
    }

    output_path = '../../public/conferences/2025/assets/data/popover-data.json'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\nData saved to {output_path}")
    print(f"Total speakers: {len(speakers)}")
    print(f"Total agenda items: {len(agenda)}")

    return output_data


if __name__ == "__main__":
    main()
