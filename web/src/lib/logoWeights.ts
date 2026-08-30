/**
 * Optical weights for the partner/sponsor logo strip.
 *
 * Sizing logos to one height makes a mixed wall look uneven: a wide wordmark
 * at 72px carries several times the visual mass of a compact badge at 72px.
 * These multipliers even that out by *ink volume* instead — how much mark
 * actually lands on the page, not how tall its bounding box is.
 *
 * How they were derived (repeatable):
 *   1. Rasterise each logo to a common height, honouring its Sanity crop.
 *   2. Trim the surrounding whitespace, then count the non-background pixels
 *      inside the trimmed box. That product is the mark's ink area.
 *   3. weight = (median ink area / this logo's ink area) ^ 0.34, clamped to
 *      [0.72, 1.35].
 *
 * The 0.34 exponent is the judgement call. At 0 every logo shares a height
 * (today's problem); at 0.5 every logo shares an ink area, which shrinks wide
 * wordmarks further than the eye wants. A third of the way up reads even
 * without looking manipulated.
 *
 * Seven logos also carry heavy built-in whitespace. That is fixed at source
 * with Sanity's `crop` field rather than compensated for here, so the weights
 * describe the mark rather than its padding — and so editors can adjust the
 * crop in the Studio.
 *
 * A logo missing from this map renders at weight 1, i.e. plain height
 * normalisation. Safe, just less even; add a measured entry when one is added.
 */
export const LOGO_OPTICAL_WEIGHTS: Record<string, number> = {
  "Adobe":                  0.81,
  "AI Hawaii":              1.35,
  "Anthology Finn":         1.35,
  "Entrepreneurs Sandbox":  0.97,
  "Hawaii Coworking":       0.75,
  "Holoholo App":           1.31,
  "Honolulu BitDevs":       1.12,
  "Honolulu Tech Network":  1.33,
  "HTDC":                   0.98,
  "HTW":                    0.94,
  "Hub Coworking":          1.35,
  "Hub Coworking Hawaii":   1.35,
  "KCC NMA":                0.84,
  "Mantle":                 0.74,
  "OER":                    1.35,
  "Pi'iku Co.":             0.82,
  "Purple Mai'a":           1.28,
  "RVCM":                   1.18,
  "Servco":                 0.72,
  "Shaka Guide":            0.72,
  "Terranox":               0.94,
  "University of Hawaii":   1.35,
  "Vanta":                  1.02,
  "Zippy's":                0.79,
};

export const logoWeight = (name: string): number =>
  LOGO_OPTICAL_WEIGHTS[name] ?? 1;
