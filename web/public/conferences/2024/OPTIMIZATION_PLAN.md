# Conference 2024 Page Optimization Plan

## Objective
Reduce the size and complexity of `index.html` (currently 1.1MB, 20,333 lines) by extracting inline assets to external files.

## Current State
| Component | Size/Count | Lines |
|-----------|------------|-------|
| Total file | 1.1MB | 20,333 |
| Head section | ~6,884 lines | All inline CSS |
| Style blocks | 7 | ~6,400 lines |
| Inline SVGs | 29 | Scattered throughout |
| Data URI SVGs in CSS | 3+ large ones | ~4KB+ each |

## Verification Requirement
**Before and after each major change, use the capture script to ensure visual parity:**

```bash
# Before changes
./capture.sh -p before -o /conferences/2024/index.html /conferences/2024

# After changes
./capture.sh -p after -o /conferences/2024/index.html /conferences/2024

# Compare (visually or with diff tool)
```

All screenshots must match exactly before proceeding to the next step.

## Implementation Steps

### Phase 1: Setup & Baseline
- [x] Analyze current file structure
- [x] Take "before" screenshots for baseline
- [x] Verify dev server works correctly

### Phase 2: Extract CSS to External File ✅
- [x] Create `assets/css/styles.css`
- [x] Extract all `<style>` block content (7 style blocks)
- [x] Replace inline styles with `<link rel="stylesheet" href="/conferences/2024/assets/css/styles.css">`
- [x] Take "after" screenshots and verify match (17/17 match)
- [ ] Commit if successful

**Results:**
- index.html: 1.1MB → 936KB (20,333 → 13,504 lines)
- New CSS file: 284KB (6,839 lines)

### Phase 3: Extract Large Data URI SVGs from CSS ✅
- [x] Identify data URI SVGs in CSS (found 1 large data URI)
- [x] Extract "UXPERIENCE ALOHA" logo to `assets/images/uxperience-aloha-text.svg` (8.3KB)
- [x] Update CSS references to use file paths
- [x] Take screenshots and verify match (17/17 match)
- [ ] Commit if successful

**Results:**
- CSS file: 284KB → 216KB (68KB saved)

### Phase 4: Extract Inline SVGs from HTML ⏭️ SKIPPED
Analysis found 27 inline SVGs:
- **Lottie animations** (lines 349-7500): Complex path-based animations with IDs and transforms. Extracting these risks breaking animations.
- **SVG sprites** (lines 13395-13500): Icon definitions used via `<use>` elements. Require ID references to work.

**Decision:** Skip this phase as the risk of breaking functionality outweighs the benefit. The inline SVGs are integral to the page's animations.

### Phase 5: Cleanup & Optimization
- [ ] Review and remove unused CSS rules (optional)
- [ ] Minify CSS file (optional)
- [ ] Final screenshot comparison
- [x] Final commit

## Actual Results
| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| index.html size | 1.1MB | 936KB | ~16% |
| index.html lines | 20,333 | 13,504 | 33% |
| External CSS | 0 | 216KB | New file |
| External SVGs | 5 | 6 | +1 extracted |

**Total file size reduction:** ~200KB (CSS content moved out)

## Rollback Plan
If visual regression is detected:
1. Revert the last change with `git checkout -- <file>`
2. Investigate the difference
3. Fix and retry

## Notes
- This is a static export from Framer - styles are framework-generated
- Some inline styles on elements must remain (they're component-specific)
- Only extracting `<style>` blocks, not inline `style=""` attributes
