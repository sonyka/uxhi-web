
// Conference Site Interactions - 2025
// Placeholder - run extract_popovers.py to populate with real data

(function() {
    'use strict';

    // Will be populated by extract_popovers.py
    let popoverData = null;

    // Wait for Framer hydration to complete before initializing
    // Framer loads via async modules and hydrates after initial page parse
    function initAfterFramerHydration() {
        if (document.readyState === 'complete') {
            // Page fully loaded - wait a bit for Framer to finish hydrating
            setTimeout(performInitialization, 150);
        } else {
            // Wait for load event (all resources loaded), then wait for Framer
            window.addEventListener('load', () => {
                setTimeout(performInitialization, 150);
            });
        }
    }

    function performInitialization() {
        initOverlayFix();
        initFAQAccordions();

        // Load popover data for speaker popovers
        fetch('/conferences/2025/assets/data/popover-data.json')
            .then(r => r.json())
            .then(data => {
                popoverData = data;
                console.log('Loaded popover data:', data);
                initSpeakerPopovers();
            })
            .catch(err => console.log('No popover data yet:', err));
    }

    function initOverlayFix() {
        // Fix overlay blocking
        const overlay = document.getElementById('template-overlay');
        if (overlay) {
            overlay.style.pointerEvents = 'none';
            overlay.querySelectorAll('*').forEach(el => {
                el.style.pointerEvents = 'none';
            });
        }
    }

    // Start initialization process
    initAfterFramerHydration();

    function normalizeText(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\u0027\u2019\u2018\u02BB]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function initSpeakerPopovers() {
        // Intercept all clicks on Team Cards and their children (including links)
        document.addEventListener('click', (e) => {
            const card = e.target.closest('[data-framer-name="Team Card"]');
            if (!card) return;

            // Check if clicking a social link (allow those to work)
            const link = e.target.closest('a');
            if (link) {
                const href = link.getAttribute('href') || '';
                // Allow external social media links
                if (href.includes('linkedin') || href.includes('twitter') ||
                    href.includes('instagram') || href.includes('x.com')) {
                    return; // Let the link work normally
                }
                // Block internal navigation links
                e.preventDefault();
                e.stopPropagation();
            }

            // 2025 site uses p for names, 2024 used h3
            const nameEl = card.querySelector('p') || card.querySelector('h3');
            if (!nameEl) return;

            const clickedName = normalizeText(nameEl.textContent);
            // Try exact match first, then partial match (for cases like "Kim" matching "Kim Davidson")
            let speaker = popoverData.speakers.find(s =>
                normalizeText(s.name) === clickedName
            );
            if (!speaker) {
                speaker = popoverData.speakers.find(s => {
                    const normalizedName = normalizeText(s.name);
                    return clickedName.startsWith(normalizedName) ||
                           normalizedName.startsWith(clickedName) ||
                           clickedName.includes(normalizedName);
                });
            }

            if (speaker) {
                e.preventDefault();
                e.stopPropagation();
                showSpeakerPopover(speaker);
            }
        }, true);

        // Also disable all internal navigation links on Team Cards
        document.querySelectorAll('[data-framer-name="Team Card"] a').forEach(link => {
            const href = link.getAttribute('href') || '';
            // Keep social media links, remove internal navigation
            if (!href.includes('linkedin') && !href.includes('twitter') &&
                !href.includes('instagram') && !href.includes('x.com') &&
                !href.startsWith('http')) {
                link.removeAttribute('href');
                link.style.cursor = 'pointer';
            }
        });
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
            const parent = question.parentElement;
            const answer = parent.querySelector('[data-framer-name="Answer"]');

            // Framer uses opacity/height for animations, not display
            // Hide all answers initially
            if (answer) {
                answer.style.opacity = '0';
                answer.style.height = '0';
                answer.style.overflow = 'hidden';
            }

            question.addEventListener('click', () => {
                if (answer) {
                    const isHidden = answer.style.opacity === '0';
                    if (isHidden) {
                        answer.style.opacity = '1';
                        answer.style.height = 'auto';
                        answer.style.overflow = 'visible';
                    } else {
                        answer.style.opacity = '0';
                        answer.style.height = '0';
                        answer.style.overflow = 'hidden';
                    }
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
