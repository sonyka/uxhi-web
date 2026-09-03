// Community stats, sourced once.
//
// These were written out at eight call sites and had drifted into three
// different answers: the homepage said 470, /join and /about said 400+, and the
// root metadata still said 500+ from an edit in January that never reached the
// rest of the site. A figure a visitor can compare across two pages has to come
// from one place, or it will disagree with itself again.
//
// Update the number here and every mention follows.

/** Members in the UXHI Slack community. */
export const MEMBER_COUNT = 470;

/**
 * The rounded-up form, for prose ("470+ designers").
 *
 * Use MEMBER_COUNT itself wherever the sentence already carries the sense of
 * growth — "470 members and counting" does not also need a plus.
 */
export const MEMBER_COUNT_PLUS = `${MEMBER_COUNT}+`;
