interface IconProps {
  className?: string;
}

/**
 * InfoIcon - UXHI's own info mark: a solid rounded speech form with the "i"
 * knocked out of it.
 *
 * Drawn on a 40x40 grid and filled rather than stroked, so unlike the Lucide
 * glyphs elsewhere it does not thin out as it scales down. Sized explicitly
 * by the caller rather than in em, because the artwork holds up better at
 * set sizes than at whatever a surrounding type ramp happens to produce.
 *
 * The source export carried `fill="black"` plus an inline fill style; both
 * are dropped for `currentColor` so the icon takes its colour from the
 * trigger it sits in. The inline style mattered — it would have won over the
 * fill attribute and pinned the mark black on dark backgrounds.
 */
export function InfoIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.6055 0.0487444C21.4627 -0.151169 24.3293 0.265416 27.0117 1.26945C29.694 2.27344 32.1297 3.84139 34.1533 5.86808C36.1771 7.89498 37.7423 10.3335 38.7422 13.0175C39.742 15.7015 40.1536 18.5689 39.9492 21.4257C39.2143 32.0135 29.8611 39.9999 18.1934 39.9999H8.33301C6.12387 39.9973 4.00549 39.1186 2.44336 37.5566C0.881214 35.9944 0.00264629 33.8761 0 31.6669V20.0868C0.0571438 15.121 1.92911 10.3404 5.27246 6.65324C8.72356 2.84741 13.4867 0.488105 18.6055 0.0487444ZM18.3867 16.6913C17.9448 16.6914 17.5205 16.8671 17.208 17.1796C16.8955 17.4921 16.7207 17.9163 16.7207 18.3583C16.7207 18.8003 16.8955 19.2245 17.208 19.537C17.5205 19.8495 17.9448 20.0253 18.3867 20.0253H20.0537V30.0243C20.0537 30.4663 20.2294 30.8905 20.542 31.203C20.8544 31.5153 21.278 31.6912 21.7197 31.6913C22.1617 31.6913 22.5859 31.5155 22.8984 31.203C23.211 30.8905 23.3867 30.4663 23.3867 30.0243V20.0253C23.3867 19.1413 23.0352 18.293 22.4102 17.6679C21.7851 17.0429 20.9376 16.6914 20.0537 16.6913H18.3867ZM20.0537 8.35929C19.3909 8.35929 18.7549 8.62213 18.2861 9.09074C17.8174 9.55946 17.5538 10.1954 17.5537 10.8583C17.5537 11.5213 17.8173 12.1571 18.2861 12.6259C18.7549 13.0947 19.3907 13.3583 20.0537 13.3583C20.7166 13.3582 21.3525 13.0946 21.8213 12.6259C22.2899 12.1571 22.5537 11.5212 22.5537 10.8583C22.5536 10.1954 22.29 9.55946 21.8213 9.09074C21.3525 8.62202 20.7166 8.35937 20.0537 8.35929Z" />
    </svg>
  );
}
