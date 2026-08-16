import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Raw hex colors are the one thing that reliably rots the conference theme:
// a literal silently stops tracking the parent UXHI palette. Conference code
// has zero of them today (Phase 1), so this rule starts clean and only ever
// fires on a regression. See docs/CONFERENCE-DESIGN-SYSTEM.md.
const NO_RAW_HEX =
  "Raw hex color. Reference a token from the year's theme (conferences/<year>/theme.ts) " +
  "instead — a literal stops tracking the parent palette. See docs/CONFERENCE-DESIGN-SYSTEM.md.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored bundles — multi-MB Framer/Sanity builds that ESLint has no
    // reason to parse. Without these, `npm run lint` exhausts the 4GB heap
    // and dies before linting a single source file.
    "dist/**",
    "public/**",
  ]),
  {
    files: ["src/app/(conference)/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: 'Literal[value=/#[0-9a-fA-F]{6}\\b/]', message: NO_RAW_HEX },
        { selector: 'TemplateElement[value.raw=/#[0-9a-fA-F]{6}\\b/]', message: NO_RAW_HEX },
      ],
    },
  },
]);

export default eslintConfig;
