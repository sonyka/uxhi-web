/**
 * Optical weights for the partner/sponsor logo grids.
 *
 * Sizing logos to one height makes a mixed wall look uneven: a wide wordmark
 * at 36px carries several times the visual mass of a compact badge at 36px.
 * These multipliers even that out by *ink volume* instead — how much mark
 * actually lands on the page, not how tall its bounding box is.
 *
 * How they were derived (repeatable):
 *   1. Render each logo the way the grid does — Sanity `crop` applied, alpha
 *      preserved — to a common raster height of 240px.
 *   2. Flatten it on the page's beige ground and measure ink as the summed
 *      darkness relative to that ground, in Rec709 luma. Summing *darkness*
 *      rather than counting non-background pixels is what makes a fine-line
 *      seal and a solid badge comparable: a hairline mark that fills its box
 *      registers as the light mark it is.
 *   3. weight = (median ink / this logo's ink) ^ 0.46, clamped to [0.55, 1.75].
 *
 * The 0.46 exponent is the judgement call. At 0 every logo shares a height
 * (the original problem); at 0.5 every logo shares an ink area, which shrinks
 * wide wordmarks past the point where they stay readable — Hawaii Coworking
 * lands near 22px. Just under half corrects the badges without collapsing the
 * wordmarks, and measures out at a 1.6x spread in rendered ink across the set,
 * down from 3.7x.
 *
 * Two things this replaces, both worth not reintroducing:
 *
 *   - The previous clamp of [0.72, 1.35] was binding on nine of the 23 marks,
 *     so the compact badges could not reach the size the measurement asked
 *     for. Widening the clamp is most of the improvement; the exponent is the
 *     rest. If entries start piling up at a bound again, the bound is wrong.
 *   - Ink is measured with alpha honoured. Four logos used to ship as opaque
 *     JPEGs, so their white field counted toward the mark's box and quietly
 *     inflated it. Any replacement asset must be measured, not guessed.
 *
 * A logo also carrying heavy built-in whitespace is fixed at source with
 * Sanity's `crop` field rather than compensated for here, so the weights
 * describe the mark rather than its padding — and so editors can adjust the
 * crop in the Studio.
 *
 * These are tuned so no mark hits the cell's max-width: `weight` sets height
 * only, and a logo wide enough to be width-capped would silently ignore its
 * weight. Shaka Guide (7:1) is the closest and still clears it.
 *
 * A logo missing from this map renders at weight 1, i.e. plain height
 * normalisation. Safe, just less even; add a measured entry when one is added.
 */
export const LOGO_OPTICAL_WEIGHTS: Record<string, number> = {
  "Adobe":                  0.87,
  "AI Hawaii":              1.53,
  "Anthology Finn":         1.38,
  "Entrepreneurs Sandbox":  1.01,
  "Hawaii Coworking":       0.65,
  "Holoholo App":           1.75,
  "Honolulu BitDevs":       1.23,
  "Honolulu Tech Network":  1.56,
  "HTDC":                   1.00,
  "HTW":                    0.80,
  "Hub Coworking":          1.39,
  "Hub Coworking Hawaii":   1.39,
  "KCC NMA":                0.90,
  "Mantle":                 0.61,
  "OER":                    1.75,
  "Pi'iku Co.":             0.79,
  "Purple Mai'a":           1.30,
  "RVCM":                   1.56,
  "Servco":                 0.65,
  "Shaka Guide":            0.63,
  "Terranox":               0.94,
  "University of Hawaii":   1.57,
  "Vanta":                  0.92,
  "Zippy's":                0.90,
};

export const logoWeight = (name: string): number =>
  LOGO_OPTICAL_WEIGHTS[name] ?? 1;
