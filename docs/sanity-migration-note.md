Hey team! Quick update on the Sanity CMS plan for the site.

**What we're moving to Sanity next:**
- Upcoming events (so we can keep those current without a code deploy)
- Sponsors & partners logos
- Committees
- Conference archive links
- Featured press mentions

These are the things that actually change on a regular basis and make sense for the team to manage directly through the Sanity dashboard.

**Why some things are staying in code:**
A lot of the site copy — hero headlines, the mission statement, nav links, contact info, footer, etc. — is tightly tied to the page layout and design. Moving all of that into Sanity would mean building out schemas, queries, and fallback logic for every single text field, which adds a lot of complexity for content that realistically changes once a year, if ever. When those do need a tweak, it's a quick update on our end.

The rule of thumb we're going with: **if a non-developer needs to update it more than once a year, and the update doesn't require a design change, it goes in Sanity.** Everything else stays in code where it's simpler and less fragile.

We're well within Sanity's free plan limits (10k documents, 1M requests/month, 20 users) so no concerns there.

Happy to chat more if anyone has questions!
