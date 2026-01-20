#!/usr/bin/env python3
"""
Extract speaker and agenda popover data from the Framer conference site.
"""

import json
import time
import os
from playwright.sync_api import sync_playwright


def extract_speakers_and_bios(page):
    """Extract all speaker data including bios by clicking on each speaker."""

    # First, scroll to speakers section
    page.evaluate("""() => {
        const heading = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('Keynote'));
        if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    }""")
    time.sleep(1)

    # Get the list of speaker names
    speaker_names = page.evaluate("""() => {
        const speakers = [];
        const containers = document.querySelectorAll('[data-framer-name="Desktop"]');
        containers.forEach(container => {
            const h3 = container.querySelector('h3');
            if (!h3) return;
            const name = h3.textContent.trim();
            if (!name || name.length > 50) return;
            if (!speakers.includes(name)) speakers.push(name);
        });
        return speakers;
    }""")

    print(f"Found {len(speaker_names)} speakers")
    speakers = []

    for name in speaker_names:
        try:
            # Press Escape to close any existing popover
            page.keyboard.press("Escape")
            time.sleep(0.5)

            # Find the h3 with the speaker name and click on it
            h3_selector = f'h3:text-is("{name}")'
            clicked = False

            try:
                h3 = page.locator(h3_selector).first
                h3.scroll_into_view_if_needed(timeout=3000)
                time.sleep(0.3)

                # Click directly on the h3 element
                h3.click(timeout=10000)
                time.sleep(2)  # Wait longer for Framer animation
                clicked = True
            except Exception as click_error:
                print(f"    Click error for {name}: {click_error}")

            if clicked:

                # Now extract data from the expanded card - look for the widest card with this name
                data = page.evaluate(f"""() => {{
                    const containers = document.querySelectorAll('[data-framer-name="Desktop"]');
                    let result = {{ name: "{name}", title: '', bio: '', links: [], imageUrl: '', debug: {{}} }};
                    let maxWidth = 0;
                    let bestContainer = null;

                    // Find the widest container with this speaker's name (the expanded one)
                    for (const container of containers) {{
                        const h3 = container.querySelector('h3');
                        if (!h3 || h3.textContent.trim() !== "{name}") continue;

                        const rect = container.getBoundingClientRect();
                        if (rect.width > maxWidth) {{
                            maxWidth = rect.width;
                            bestContainer = container;
                        }}
                    }}

                    result.debug.maxWidth = maxWidth;

                    if (!bestContainer) return result;
                    const container = bestContainer;

                    // Get title (first p element, usually the job title)
                    const paragraphs = [...container.querySelectorAll('p')];
                    result.debug.paragraphCount = paragraphs.length;
                    if (paragraphs.length > 0) {{
                        result.title = paragraphs[0].textContent.trim();
                    }}

                    // Get links
                    container.querySelectorAll('a[href]').forEach(a => {{
                        const href = a.href;
                        let type = 'website';
                        if (href.includes('linkedin')) type = 'linkedin';
                        else if (href.includes('instagram')) type = 'instagram';
                        result.links.push({{ href, type }});
                    }});

                    // Get image
                    const img = container.querySelector('img');
                    result.imageUrl = img ? img.src : '';

                    // Get bio - all paragraphs after the first one
                    if (paragraphs.length > 1) {{
                        const bioTexts = paragraphs.slice(1).map(p => p.textContent.trim()).filter(t => t && t.length > 10);
                        result.bio = bioTexts.join(' ');
                    }}

                    // If no bio found in paragraphs, look for any text content that looks like a bio
                    if (!result.bio) {{
                        const allText = container.textContent;
                        // Remove the name and title from the text
                        let bioText = allText.replace("{name}", '').replace(result.title, '').trim();
                        // Clean up extra whitespace
                        bioText = bioText.replace(/\\s+/g, ' ').trim();
                        if (bioText.length > 50) {{
                            result.bio = bioText;
                        }}
                    }}

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

    # Scroll to agenda section
    page.evaluate("""() => {
        const heading = [...document.querySelectorAll('h2')].find(h => h.textContent === 'Agenda');
        if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    }""")
    time.sleep(1)

    # Extract agenda using a more robust approach - look at the agenda section structure
    agenda = page.evaluate("""() => {
        const sessions = [];

        // Find the Agenda heading and work from there
        const agendaHeading = [...document.querySelectorAll('h2')].find(h => h.textContent === 'Agenda');
        if (!agendaHeading) return sessions;

        // Find agenda items - they have a specific structure with time, room, type, title, speaker
        // Look for elements with time patterns
        const timePattern = /^\\d{1,2}:\\d{2}\\s*(am|pm)$/i;

        document.querySelectorAll('div').forEach(div => {
            const text = div.textContent.trim();
            if (!timePattern.test(text)) return;

            // Found a time element, now find its sibling info
            const parent = div.parentElement;
            if (!parent) return;

            // Get all text content from parent's children
            const parts = [];
            const walkNodes = (el) => {
                if (el.children.length === 0) {
                    const t = el.textContent.trim();
                    if (t && t.length < 150) parts.push(t);
                } else {
                    for (const child of el.children) {
                        walkNodes(child);
                    }
                }
            };

            // Walk up to find the session container
            let sessionContainer = parent;
            for (let i = 0; i < 3; i++) {
                if (sessionContainer.parentElement) {
                    sessionContainer = sessionContainer.parentElement;
                }
            }

            walkNodes(sessionContainer);

            // Build session from parts
            const session = {
                time: text,
                room: '',
                type: '',
                title: '',
                speaker: ''
            };

            const rooms = ['Main Room', 'Purple Box'];
            const types = ['keynote', 'talk', 'panel', 'workshop'];

            for (const part of parts) {
                if (part === text) continue;
                const lowerPart = part.toLowerCase();

                if (rooms.includes(part)) {
                    session.room = part;
                } else if (types.includes(lowerPart)) {
                    session.type = lowerPart;
                } else if (!session.title && part.length > 3) {
                    session.title = part;
                } else if (!session.speaker && (part.includes(',') || part.includes('&'))) {
                    session.speaker = part;
                }
            }

            // Only add if we have a title and it's not already in the list
            if (session.title && !sessions.find(s => s.time === session.time && s.title === session.title)) {
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
    print("Starting popover data extraction...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        print("Loading conference page...")
        page.goto("https://uxhiconference.com/2024", wait_until="networkidle", timeout=60000)
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

    output_path = '../../public/conferences/2024/assets/data/popover-data.json'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\nData saved to {output_path}")
    print(f"Total speakers: {len(speakers)}")
    print(f"Total agenda items: {len(agenda)}")

    return output_data


if __name__ == "__main__":
    main()
