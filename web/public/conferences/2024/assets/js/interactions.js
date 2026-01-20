/**
 * Conference Site Interactions
 * Enables navigation, FAQ accordions, speaker popovers, and agenda tooltips
 */

(function() {
    'use strict';

    let popoverData = null;
    let activePopover = null;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    async function init() {
        console.log('Initializing conference site interactions...');

        // Load popover data
        try {
            const response = await fetch('/conferences/2024/assets/data/popover-data.json');
            popoverData = await response.json();
            console.log('Loaded popover data:', popoverData.speakers?.length, 'speakers,', popoverData.agenda?.length, 'agenda items');
        } catch (e) {
            console.warn('Could not load popover data:', e);
            popoverData = { speakers: [], agenda: [] };
        }

        // Add styles early so CSS fixes (like geometric pattern) apply immediately
        addPopoverStyles();

        initNavigation();
        initFAQAccordions();
        initSmoothScroll();
        initSpeakerPopovers();
        initAgendaTooltips();
        hideBrokenSocialIcons();
        hideExpandedKeynoteCard();
        fixOverlayBlocking();

        // Close popover when clicking outside
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);

        console.log('Conference interactions initialized');
    }

    /**
     * Handle document clicks to close popovers
     */
    function handleDocumentClick(e) {
        if (activePopover && !activePopover.contains(e.target)) {
            const isClickOnSpeaker = e.target.closest('[data-speaker-name]');
            const isClickOnAgenda = e.target.closest('[data-agenda-index]');
            if (!isClickOnSpeaker && !isClickOnAgenda) {
                closeActivePopover();
            }
        }
    }

    /**
     * Handle keyboard events
     */
    function handleKeyDown(e) {
        if (e.key === 'Escape' && activePopover) {
            closeActivePopover();
        }
    }

    /**
     * Close the currently active popover
     */
    function closeActivePopover() {
        if (activePopover) {
            activePopover.remove();
            activePopover = null;
        }
    }

    /**
     * Normalize text for comparison:
     * - Handle curly vs straight quotes/apostrophes (including Hawaiian ʻokina)
     * - Normalize Unicode (NFD) and strip combining diacritical marks (macrons, etc.)
     * - Collapse multiple spaces into single space
     */
    function normalizeText(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')  // Strip combining diacritical marks
            .replace(/[\u0027\u2019\u2018\u02BB]/g, "'")  // Normalize apostrophes (including ʻokina)
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/\s+/g, ' ')  // Collapse whitespace
            .trim();
    }

    /**
     * Initialize speaker card popovers using document-level event delegation
     * This handles Framer's complex overlapping layout where click events
     * may not bubble correctly through the DOM
     */
    function initSpeakerPopovers() {
        if (!popoverData?.speakers?.length) return;

        // Build a map of speaker name elements and their bounding areas
        const speakerElements = [];
        const h3Elements = document.querySelectorAll('h3');

        // Pre-normalize speaker names for comparison
        const normalizedSpeakers = popoverData.speakers.map(s => ({
            ...s,
            normalizedName: normalizeText(s.name)
        }));

        h3Elements.forEach(h3 => {
            const name = h3.textContent.trim();
            const normalizedName = normalizeText(name);
            const speaker = normalizedSpeakers.find(s => s.normalizedName === normalizedName);

            if (speaker) {
                // Find the parent card container for visual reference
                const card = h3.closest('[data-framer-name="Desktop"]') ||
                             h3.closest('.framer-GFaBS') ||
                             h3.parentElement?.parentElement?.parentElement;

                if (card) {
                    card.style.cursor = 'pointer';
                    card.setAttribute('data-speaker-name', name);
                    speakerElements.push({ h3, card, speaker, name });
                }
            }
        });

        // Use document-level click handler to detect clicks on speaker cards
        document.addEventListener('click', (e) => {
            // Don't handle if clicking on popover or its contents
            if (e.target.closest('.speaker-popover') || e.target.closest('.agenda-tooltip')) {
                return;
            }

            const clickX = e.clientX;
            const clickY = e.clientY;

            // Check if click is within any speaker card's bounding box
            for (const { card, speaker } of speakerElements) {
                const rect = card.getBoundingClientRect();
                if (clickX >= rect.left && clickX <= rect.right &&
                    clickY >= rect.top && clickY <= rect.bottom) {
                    e.preventDefault();
                    e.stopPropagation();
                    showSpeakerPopover(speaker, card);
                    return;
                }
            }
        }, true); // Use capture phase to get events before they're handled

        console.log('Initialized speaker popovers for', speakerElements.length, 'speakers');
    }

    /**
     * Show speaker popover
     */
    function showSpeakerPopover(speaker, triggerElement) {
        closeActivePopover();

        const popover = document.createElement('div');
        popover.className = 'speaker-popover';
        popover.innerHTML = `
            <div class="speaker-popover-content">
                <button class="popover-close" aria-label="Close">&times;</button>
                <h3 class="speaker-popover-name">${speaker.name}</h3>
                <p class="speaker-popover-title">${speaker.title}</p>
                ${speaker.bio ? `<p class="speaker-popover-bio">${speaker.bio}</p>` : ''}
                <div class="speaker-popover-links">
                    ${speaker.links.map(link => `
                        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="speaker-link speaker-link-${link.type}" title="${link.type}">
                            ${getSocialIcon(link.type)}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        // Add styles if not already added
        addPopoverStyles();

        document.body.appendChild(popover);
        activePopover = popover;

        // Position the popover
        positionPopover(popover, triggerElement);

        // Close button handler
        popover.querySelector('.popover-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closeActivePopover();
        });

        // Animate in
        requestAnimationFrame(() => {
            popover.classList.add('visible');
        });
    }

    /**
     * Get social media icon SVG
     */
    function getSocialIcon(type) {
        const icons = {
            linkedin: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
            instagram: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
            website: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',
            twitter: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
        };
        return icons[type] || icons.website;
    }

    /**
     * Position popover near trigger element
     */
    function positionPopover(popover, trigger) {
        const rect = trigger.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left, top;

        // Position below the trigger, aligned to its left edge
        left = rect.left;
        top = rect.bottom + 10;

        // If popover would go off right edge, align to right edge of viewport
        if (left + popoverRect.width > viewportWidth - 20) {
            left = viewportWidth - popoverRect.width - 20;
        }

        // If popover would go off left edge, align to left edge
        if (left < 20) {
            left = 20;
        }

        // If popover would go off bottom, position above the trigger
        if (top + popoverRect.height > viewportHeight - 20) {
            top = rect.top - popoverRect.height - 10;
        }

        // If still off top, just position at top of viewport
        if (top < 20) {
            top = 20;
        }

        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
    }

    /**
     * Initialize agenda item tooltips using document-level event delegation
     * Similar to speaker popovers, this handles Framer's complex layout
     */
    function initAgendaTooltips() {
        if (!popoverData?.agenda?.length) return;

        // Build list of agenda sessions with descriptions
        const agendaSessions = popoverData.agenda
            .filter(a => a.title && a.description)
            .map(a => ({
                title: a.title,
                normalizedTitle: normalizeText(a.title),
                item: a
            }));

        // Find and mark agenda title elements (only first match per title to avoid duplicates)
        const sessionElements = [];
        const textElements = document.querySelectorAll('p.framer-text, h3');
        const processedTitles = new Set();

        textElements.forEach(el => {
            const text = el.textContent.trim();
            const normalizedText = normalizeText(text);

            // Skip if we already processed this title
            if (processedTitles.has(normalizedText)) return;

            const match = agendaSessions.find(a => a.normalizedTitle === normalizedText);
            if (match) {
                el.style.cursor = 'pointer';
                el.setAttribute('data-agenda-title', text);
                sessionElements.push({ el, item: match.item });
                processedTitles.add(normalizedText);
            }
        });

        // Use document-level click handler in capture phase
        document.addEventListener('click', (e) => {
            // Don't handle if clicking on popover elements
            if (e.target.closest('.speaker-popover') || e.target.closest('.agenda-tooltip')) {
                return;
            }

            const clickX = e.clientX;
            const clickY = e.clientY;

            // Check if click is within any session element's bounding box
            for (const { el, item } of sessionElements) {
                const rect = el.getBoundingClientRect();
                if (clickX >= rect.left && clickX <= rect.right &&
                    clickY >= rect.top && clickY <= rect.bottom) {
                    e.preventDefault();
                    e.stopPropagation();
                    showAgendaTooltip(item, el);
                    return;
                }
            }
        }, true); // Use capture phase

        console.log('Initialized agenda tooltips for', sessionElements.length, 'sessions');
    }

    /**
     * Show agenda tooltip
     */
    function showAgendaTooltip(item, triggerElement) {
        closeActivePopover();

        const tooltip = document.createElement('div');
        tooltip.className = 'agenda-tooltip';
        tooltip.innerHTML = `
            <div class="agenda-tooltip-content">
                <button class="popover-close" aria-label="Close">&times;</button>
                ${item.type ? `<span class="agenda-type">${item.type}</span>` : ''}
                <h4 class="agenda-title">${item.title}</h4>
                ${item.speaker ? `<p class="agenda-speaker">${item.speaker}</p>` : ''}
                ${item.description ? `<p class="agenda-description">${item.description}</p>` : ''}
                <div class="agenda-meta">
                    <span class="agenda-time">${item.time}</span>
                    ${item.room ? `<span class="agenda-room">${item.room}</span>` : ''}
                </div>
            </div>
        `;

        addPopoverStyles();
        document.body.appendChild(tooltip);
        activePopover = tooltip;

        positionPopover(tooltip, triggerElement);

        tooltip.querySelector('.popover-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closeActivePopover();
        });

        requestAnimationFrame(() => {
            tooltip.classList.add('visible');
        });
    }

    /**
     * Hide broken social icons on speaker cards
     * The scraped Framer site has icons that don't render properly
     */
    function hideBrokenSocialIcons() {
        // Find all speaker cards with Desktop wrapper
        const desktopCards = document.querySelectorAll('[data-framer-name="Desktop"]');

        let hidden = 0;
        desktopCards.forEach(desktop => {
            // Check if this is a speaker card (has an h3 with speaker name)
            const h3 = desktop.querySelector('h3');
            if (!h3) return;

            // Hide all external links in speaker cards
            const links = desktop.querySelectorAll('a[href^="http"]');
            links.forEach(link => {
                link.style.display = 'none';
                hidden++;
            });
        });

        console.log('Hidden', hidden, 'social icons on speaker cards');
    }

    /**
     * Hide the expanded keynote card from the original Framer design
     * to make it consistent with other agenda items
     */
    function hideExpandedKeynoteCard() {
        // Find and hide the expanded card container for Hawaiian Design Method
        const expandedCard = document.querySelector('.framer-s43hkk');
        if (expandedCard) {
            expandedCard.style.display = 'none';
            console.log('Hidden expanded keynote card');
        }
    }

    /**
     * Fix Framer overlay that blocks all clicks on the page
     */
    function fixOverlayBlocking() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.pointerEvents = 'none';
            overlay.querySelectorAll('*').forEach(el => {
                el.style.pointerEvents = 'none';
            });
            console.log('Fixed overlay blocking');
        }
    }

    /**
     * Add popover styles to the page
     */
    function addPopoverStyles() {
        if (document.getElementById('popover-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'popover-styles';
        styles.textContent = `
            /* Hide the expanded keynote card from Framer to match other agenda items */
            .framer-s43hkk {
                display: none !important;
            }

            /* Fix missing geometric pattern background in yellow card section */
            .framer-18whoki {
                background-image: url('/conferences/2024/assets/images/geometric-pattern.svg') !important;
                background-size: cover;
                background-position: center;
            }

            /* Fix FAQ answer text width - Framer sets 1px width on these elements */
            [data-framer-name="Answer"] * {
                width: auto !important;
                min-width: 0 !important;
            }

            /* Fix missing Entrepreneur's Sandbox sponsor logo */
            a[href*="sandboxhawaii"].framer-yl97r1 {
                background-image: url('/conferences/2024/assets/images/sandbox-logo.svg') !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            /* Fix missing HTDC sponsor logo */
            a[href*="htdc.org"].framer-b0f68b {
                background-image: url("data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" viewBox=\\"0 0 134 42\\"><path d=\\"M 15.863 0.585 C 15.501 0.627 14.398 0.779 14.053 0.829 C 13.893 0.854 13.725 0.905 13.683 0.947 C 13.623 1.007 13.674 2.626 13.843 5.586 C 13.868 5.982 13.927 7.096 13.969 8.074 L 14.137 11.363 C 14.187 12.198 14.28 14.036 14.347 15.453 C 14.423 16.87 14.55 19.527 14.642 21.357 C 14.735 23.187 14.811 24.713 14.811 24.747 C 14.811 24.789 16.132 24.814 17.74 24.814 L 20.67 24.814 L 20.863 20.994 C 20.964 18.903 21.082 16.533 21.124 15.748 C 21.166 14.956 21.284 12.738 21.377 10.815 C 21.469 8.892 21.604 6.252 21.671 4.953 C 21.731 3.654 21.797 2.213 21.814 1.757 L 21.84 0.914 L 21.52 0.846 C 20.585 0.652 19.02 0.526 17.63 0.534 C 16.797 0.542 16.006 0.568 15.863 0.584 Z M 8.623 5.762 C 4.467 8.263 1.504 12.345 0.415 17.072 C -0.208 19.787 -0.123 23.161 0.625 25.783 C 2.149 31.122 5.937 35.381 11.022 37.489 C 11.678 37.759 13.32 38.307 13.48 38.307 C 13.522 38.307 13.53 37.076 13.505 35.574 L 13.463 32.833 L 12.528 32.488 C 9.455 31.324 7.06 28.777 5.946 25.536 C 5.467 24.147 5.366 23.405 5.366 21.609 C 5.366 19.906 5.467 19.063 5.921 17.758 C 6.746 15.387 8.505 13.243 10.616 11.963 C 11.316 11.531 12.797 10.832 13.295 10.722 L 13.463 10.68 L 13.505 7.939 C 13.53 6.437 13.522 5.205 13.48 5.205 C 13.446 5.205 13.059 5.373 12.629 5.578 C 11.484 6.126 9.539 5.239 8.623 5.762 Z M 42.084 6.598 L 42.084 35.44 L 47.092 35.44 L 47.092 18.699 L 59.13 18.699 L 59.155 27.065 L 59.172 35.44 L 64.138 35.44 L 64.122 26.644 L 64.097 17.856 L 63.869 17.24 C 63.289 15.638 62.034 14.44 60.35 13.884 C 59.921 13.74 59.408 13.724 53.473 13.698 L 47.05 13.673 L 47.05 6.598 L 42.084 6.598 Z M 67.252 18.76 C 67.252 32.118 67.227 31.435 67.766 32.515 C 68.305 33.611 69.088 34.387 70.156 34.901 C 71.259 35.433 71.344 35.441 77.421 35.441 L 82.91 35.441 L 82.91 30.465 L 77.59 30.448 L 72.261 30.423 L 72.236 24.536 L 72.219 18.658 L 82.91 18.658 L 82.893 16.187 L 82.868 13.724 L 77.548 13.699 L 72.219 13.682 L 72.202 10.157 L 72.177 6.64 L 69.719 6.615 L 67.253 6.598 L 67.253 18.759 Z M 102.777 10.14 L 102.777 13.673 L 96.363 13.707 C 89.292 13.732 89.679 13.707 88.501 14.28 C 87.701 14.668 86.665 15.697 86.261 16.507 C 85.664 17.687 85.681 17.519 85.706 24.814 L 85.731 31.35 L 85.95 31.949 C 86.506 33.475 87.743 34.673 89.309 35.213 L 89.856 35.398 L 98.804 35.423 L 107.744 35.449 L 107.744 6.597 L 102.777 6.597 L 102.777 10.139 Z M 102.819 24.536 L 102.819 30.465 L 96.447 30.44 C 91.707 30.423 90.008 30.39 89.797 30.306 C 89.208 30.088 90.739 30.457 90.739 24.536 C 90.739 18.624 90.739 18.658 90.739 18.658 L 96.784 18.658 L 102.82 18.658 L 102.82 24.536 Z M 115.463 13.765 C 113.621 14.036 112.266 14.668 111.029 15.823 C 110.069 16.717 109.412 17.737 108.949 19.012 L 108.646 19.855 L 108.621 27.648 L 108.596 35.44 L 113.563 35.44 L 113.588 27.673 L 113.613 19.897 L 113.941 19.569 C 114.387 19.131 115.018 18.784 115.682 18.615 C 116.018 18.531 118.586 18.649 124.63 18.64 L 133.039 18.615 L 133.039 13.724 L 124.453 13.715 C 119.73 13.707 115.681 13.732 115.463 13.765 Z M 14.81 36.486 L 14.81 41.336 L 15.298 41.403 C 15.921 41.487 19.591 41.487 20.222 41.403 L 20.702 41.336 L 20.702 31.646 L 14.81 31.646 Z\\" fill=\\"rgb(255,255,255)\\"></path></svg>") !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            /* Fix missing FINN (Anthology) bronze sponsor logo */
            a[href*="anthologygroup.com"].framer-8bz7ij {
                background-image: url('/conferences/2024/assets/images/finn-logo.svg') !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            /* Fix missing Shaka Guide bronze sponsor logo */
            a[href*="shakaguide.com"].framer-k8lxjp {
                background-image: url('/conferences/2024/assets/images/shaka-guide-logo.svg') !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            /* Fix missing Terranox bronze sponsor logo */
            .framer-1kzxv7x {
                background-image: url('/conferences/2024/assets/images/terranox-logo.svg') !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            /* Fix missing THE LINEUP heading */
            .framer-qejdxe {
                background-image: url('/conferences/2024/assets/images/the-lineup-heading.svg') !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            /* Fix missing PORTFOLIO REVIEWS heading */
            .framer-afxzt5 {
                background-image: url('/conferences/2024/assets/images/portfolio-reviews-heading.svg') !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }

            .speaker-popover, .agenda-tooltip {
                position: fixed;
                z-index: 999999;
                opacity: 0;
                transform: translateY(10px);
                transition: opacity 0.2s ease, transform 0.2s ease;
                isolation: isolate;
            }

            .speaker-popover.visible, .agenda-tooltip.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .speaker-popover-content {
                background: #e8f4f6;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.25);
                padding: 24px 28px;
                max-width: 520px;
                position: relative;
                border-left: 6px solid #09c0d7;
            }

            .popover-close {
                position: absolute;
                top: 12px;
                right: 12px;
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #231769;
                padding: 4px 8px;
                line-height: 1;
                opacity: 0.6;
            }

            .popover-close:hover {
                opacity: 1;
                color: #09c0d7;
            }

            .speaker-popover-name {
                margin: 0 0 6px 0;
                font-family: 'Dela Gothic One', cursive, sans-serif;
                font-size: 28px;
                font-weight: 400;
                color: #231769;
                padding-right: 40px;
            }

            .speaker-popover-title {
                margin: 0 0 16px 0;
                font-size: 13px;
                color: #231769;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                font-weight: 600;
            }

            .speaker-popover-bio {
                margin: 0 0 20px 0;
                font-size: 15px;
                line-height: 1.6;
                color: #1a1a2e;
            }

            .speaker-popover-links {
                display: flex;
                gap: 10px;
            }

            .speaker-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                text-decoration: none;
                transition: transform 0.2s ease, opacity 0.2s ease;
            }

            .speaker-link:hover {
                transform: scale(1.1);
                opacity: 0.85;
            }

            .speaker-link-linkedin {
                background: #231769;
                color: white;
            }

            .speaker-link-instagram {
                background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
                color: white;
            }

            .speaker-link-website {
                background: #e8a838;
                color: #231769;
            }

            .speaker-link-twitter {
                background: #000;
                color: white;
            }

            .agenda-tooltip-content {
                background: #e8f4f6;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.25);
                padding: 24px 28px;
                max-width: 520px;
                position: relative;
                border-left: 6px solid #09c0d7;
            }

            .agenda-type {
                display: inline-block;
                background: #231769;
                color: white;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                padding: 4px 10px;
                border-radius: 4px;
                margin-bottom: 10px;
            }

            .agenda-title {
                margin: 0 0 8px 0;
                font-family: 'Dela Gothic One', cursive, sans-serif;
                font-size: 22px;
                font-weight: 400;
                color: #231769;
                padding-right: 40px;
                line-height: 1.3;
            }

            .agenda-speaker {
                margin: 0 0 14px 0;
                font-size: 13px;
                color: #231769;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }

            .agenda-description {
                margin: 0 0 16px 0;
                font-size: 15px;
                line-height: 1.6;
                color: #1a1a2e;
            }

            .agenda-meta {
                display: flex;
                gap: 16px;
                font-size: 13px;
                color: #555;
                padding-top: 12px;
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .agenda-time {
                font-weight: 600;
                color: #231769;
            }

            .agenda-room {
                background: #09c0d7;
                color: white;
                padding: 2px 10px;
                border-radius: 4px;
                font-weight: 500;
            }
        `;

        document.head.appendChild(styles);
    }

    /**
     * Initialize navigation - make nav links work for anchor scrolling
     */
    function initNavigation() {
        const allLinks = document.querySelectorAll('a');

        allLinks.forEach(link => {
            const text = (link.textContent || '').toLowerCase().trim();

            if (text.includes('lineup')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection('Keynote Speakers');
                });
            } else if (text.includes('faq')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection('Everything you');
                });
            } else if (text.includes('agenda')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection('Agenda');
                });
            } else if (text.includes('portfolio')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection('Portfolio');
                });
            }
        });
    }

    /**
     * Scroll to a section by finding text content
     */
    function scrollToSection(searchText) {
        const candidates = document.querySelectorAll('h1, h2, h3, section, [data-framer-name]');

        for (const el of candidates) {
            const elText = el.textContent || '';
            const attrName = el.getAttribute('data-framer-name') || '';

            if (elText.toLowerCase().includes(searchText.toLowerCase()) ||
                attrName.toLowerCase().includes(searchText.toLowerCase())) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }

        console.log('Section not found:', searchText);
    }

    /**
     * Initialize FAQ accordion functionality
     */
    function initFAQAccordions() {
        const questions = document.querySelectorAll('[data-framer-name="Question"]');

        questions.forEach((questionEl) => {
            questionEl.style.cursor = 'pointer';

            let container = questionEl.closest('[data-framer-name="Closed"]');
            if (!container) {
                container = questionEl.parentElement?.parentElement;
            }

            let answerEl = null;
            if (container) {
                answerEl = container.querySelector('[data-framer-name="Answer"]');

                if (!answerEl) {
                    const parent = container.parentElement;
                    if (parent) {
                        const children = parent.children;
                        for (let i = 0; i < children.length; i++) {
                            const child = children[i];
                            if (child.querySelector('[data-framer-name="Answer"]')) {
                                answerEl = child.querySelector('[data-framer-name="Answer"]');
                                break;
                            }
                        }
                    }
                }
            }

            let isExpanded = false;

            questionEl.addEventListener('click', () => {
                isExpanded = !isExpanded;

                if (answerEl) {
                    if (isExpanded) {
                        answerEl.style.display = 'block';
                        answerEl.style.opacity = '1';
                        answerEl.style.visibility = 'visible';
                        answerEl.style.height = 'auto';
                        answerEl.style.overflow = 'visible';
                    } else {
                        answerEl.style.display = 'none';
                    }
                }

                const icon = questionEl.querySelector('svg');
                if (icon) {
                    icon.style.transition = 'transform 0.2s ease';
                    icon.style.transform = isExpanded ? 'rotate(45deg)' : 'rotate(0deg)';
                }
            });
        });

        console.log(`Initialized ${questions.length} FAQ accordions`);
    }

    /**
     * Enable smooth scrolling for all anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.length > 1) {
                    const targetId = href.slice(1);
                    const target = document.getElementById(targetId);

                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

})();
