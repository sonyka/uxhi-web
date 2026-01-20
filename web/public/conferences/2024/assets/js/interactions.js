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

        initNavigation();
        initFAQAccordions();
        initSmoothScroll();
        initSpeakerPopovers();
        initAgendaTooltips();

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
     * Initialize speaker card popovers using document-level event delegation
     * This handles Framer's complex overlapping layout where click events
     * may not bubble correctly through the DOM
     */
    function initSpeakerPopovers() {
        if (!popoverData?.speakers?.length) return;

        // Build a map of speaker name elements and their bounding areas
        const speakerElements = [];
        const h3Elements = document.querySelectorAll('h3');

        h3Elements.forEach(h3 => {
            const name = h3.textContent.trim();
            const speaker = popoverData.speakers.find(s => s.name === name);

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
                ${speaker.imageUrl ? `<img src="${speaker.imageUrl}" alt="${speaker.name}" class="speaker-popover-image">` : ''}
                <div class="speaker-popover-info">
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

        // Default: position to the right of the trigger
        let left = rect.right + 10;
        let top = rect.top;

        // If not enough space on right, position to the left
        if (left + popoverRect.width > viewportWidth - 20) {
            left = rect.left - popoverRect.width - 10;
        }

        // If still not enough space, center horizontally
        if (left < 20) {
            left = Math.max(20, (viewportWidth - popoverRect.width) / 2);
        }

        // Vertical positioning
        if (top + popoverRect.height > viewportHeight - 20) {
            top = viewportHeight - popoverRect.height - 20;
        }
        if (top < 20) {
            top = 20;
        }

        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
    }

    /**
     * Initialize agenda item tooltips
     */
    function initAgendaTooltips() {
        if (!popoverData?.agenda?.length) return;

        // Find agenda items by looking for time patterns
        const allElements = document.querySelectorAll('div');
        const timePattern = /^\d{1,2}:\d{2}\s*(am|pm)$/i;

        let agendaIndex = 0;
        allElements.forEach(el => {
            const text = el.textContent.trim();
            if (timePattern.test(text)) {
                // Find corresponding agenda item
                const agendaItem = popoverData.agenda.find(a => a.time === text);
                if (agendaItem && agendaItem.title) {
                    // Find the parent row that contains session info
                    const row = el.closest('[class*="framer-"]')?.parentElement;
                    if (row) {
                        row.style.cursor = 'pointer';
                        row.setAttribute('data-agenda-index', agendaIndex++);

                        row.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            showAgendaTooltip(agendaItem, row);
                        });
                    }
                }
            }
        });

        console.log('Initialized agenda tooltips');
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
     * Add popover styles to the page
     */
    function addPopoverStyles() {
        if (document.getElementById('popover-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'popover-styles';
        styles.textContent = `
            .speaker-popover, .agenda-tooltip {
                position: fixed;
                z-index: 10000;
                opacity: 0;
                transform: translateY(10px);
                transition: opacity 0.2s ease, transform 0.2s ease;
            }

            .speaker-popover.visible, .agenda-tooltip.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .speaker-popover-content {
                background: #f4f1ea;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                padding: 20px;
                max-width: 400px;
                display: flex;
                gap: 16px;
                position: relative;
            }

            .popover-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #231769;
                padding: 4px 8px;
                line-height: 1;
            }

            .popover-close:hover {
                color: #09c0d7;
            }

            .speaker-popover-image {
                width: 120px;
                height: 160px;
                object-fit: cover;
                border-radius: 8px;
                flex-shrink: 0;
            }

            .speaker-popover-info {
                flex: 1;
                min-width: 0;
            }

            .speaker-popover-name {
                margin: 0 0 4px 0;
                font-size: 20px;
                font-weight: 700;
                color: #231769;
            }

            .speaker-popover-title {
                margin: 0 0 12px 0;
                font-size: 14px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .speaker-popover-bio {
                margin: 0 0 16px 0;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
            }

            .speaker-popover-links {
                display: flex;
                gap: 12px;
            }

            .speaker-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: #231769;
                color: white;
                text-decoration: none;
                transition: background 0.2s ease;
            }

            .speaker-link:hover {
                background: #09c0d7;
            }

            .agenda-tooltip-content {
                background: #ffcc40;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.2);
                padding: 16px 20px;
                max-width: 350px;
                position: relative;
            }

            .agenda-type {
                display: inline-block;
                background: #231769;
                color: white;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                padding: 4px 8px;
                border-radius: 4px;
                margin-bottom: 8px;
            }

            .agenda-title {
                margin: 0 0 8px 0;
                font-size: 18px;
                font-weight: 700;
                color: #231769;
                padding-right: 30px;
            }

            .agenda-speaker {
                margin: 0 0 12px 0;
                font-size: 14px;
                color: #333;
            }

            .agenda-meta {
                display: flex;
                gap: 16px;
                font-size: 13px;
                color: #555;
            }

            .agenda-room {
                background: rgba(0,0,0,0.1);
                padding: 2px 8px;
                border-radius: 4px;
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
