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
 * EIGHT ENTRIES ARE DELIBERATELY OFF THE FORMULA, marked inline. Re-deriving
 * will hand back the old numbers unless these are carried across.
 *
 * They all correct for one missing term. Ink is measured on LUMINANCE, so it
 * describes the muted rendering; the grids now render `tone="colour"` (see
 * LogoGrid), where a saturated mark advances and a flat dark one recedes
 * regardless of how much luminance ink each puts down. Ranking every mark by
 * colour presence — mean HCL chroma over its area — against its measured ink
 * sorts the corrections perfectly:
 *
 *                            mean colour/ink   chroma rank (of 23)
 *   corrected DOWN 20%              1.46            2nd, 4th
 *   left alone                      0.66            —
 *   corrected UP 12%                0.35            10th-22nd
 *
 * Every mark judged too big by eye is among the most colour-forward; every
 * one judged too small is among the least. Two independent rounds of notes,
 * eight logos, no inversions. That is not taste, it is a systematic error in
 * the measure.
 *
 * So the real fix is a chroma term in the ink measurement, re-derived across
 * the set. It is deferred only because these hand corrections already land
 * where the eye wants them, and a re-derivation would move all 24 weights
 * including the 15 nobody has complained about. Do it when the wall next
 * changes composition — and note it would also let University of Hawaii off
 * the 1.75 ceiling, which it is currently pinned against.
 *
 * A logo missing from this map renders at weight 1, i.e. plain height
 * normalisation. Safe, just less even; add a measured entry when one is added.
 */
export const LOGO_OPTICAL_WEIGHTS: Record<string, number> = {
  "Adobe":                  0.87,
  "AI Hawaii":              1.53,
  "Anthology Finn":         1.38,
  "Entrepreneurs Sandbox":  1.01,
  "Hawaii Coworking":       0.73, // +12% — colour-recessive, see note
  "Holoholo App":           1.40, // 20% under formula — see note
  "Honolulu BitDevs":       1.38, // +12% — colour-recessive, see note
  "Honolulu Tech Network":  1.72, // +12% — colour-recessive, see note
  "HTDC":                   1.00,
  "HTW":                    0.90, // +12% — colour-recessive, see note
  "Hub Coworking":          1.39,
  "Hub Coworking Hawaii":   1.39,
  "KCC NMA":                0.90,
  "Mantle":                 0.61,
  "OER":                    1.69,
  "Pi'iku Co.":             0.79,
  "Purple Mai'a":           1.46, // +12% — colour-recessive, see note
  "RVCM":                   1.25, // 20% under formula — see note
  "Servco":                 0.65,
  "Shaka Guide":            0.63,
  "Terranox":               0.94,
  "University of Hawaii":   1.75, // +12% (clamp ceiling) — see note
  "Vanta":                  0.92,
  "Zippy's":                0.90,
};

export const logoWeight = (name: string): number =>
  LOGO_OPTICAL_WEIGHTS[name] ?? 1;
