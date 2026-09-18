import { SponsorsGrid } from "web";
import type { ComponentProps } from "react";

type Sponsor = ComponentProps<typeof SponsorsGrid>["sponsors"][number];

/**
 * Real 2026 sponsor rows, copied out of Sanity (conferenceSponsor). The logo
 * URLs are the live Sanity CDN assets, so they resolve here the same way they
 * do on the site — no local /conferences/ asset is involved.
 */
const HTDC: Sponsor = {
  _id: "htdc",
  name: "Hawaiʻi Technology Development Corporation",
  tier: "platinum",
  url: "https://www.htdc.org",
  description:
    "A state agency accelerating Hawaiʻi's tech industry through innovation, talent development, and capital, creating jobs and opportunity for Hawaiʻi residents.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/b8a3171760bc272ddb847407ec4e0a8b9f077096-400x123.png",
  logoAspect: 3.25,
};

const SANDBOX: Sponsor = {
  _id: "sandbox",
  name: "Entrepreneurs Sandbox",
  tier: "platinum",
  url: "https://sandboxhawaii.org",
  description:
    "Hawaiʻi's front door to creativity, technology, innovation, and entrepreneurship, with event space, co-working and meeting rooms.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/e303e1881719a3e36d9867a39e01cf528b0d4bf2-400x122.png",
  logoAspect: 3.28,
};

const SERVCO: Sponsor = {
  _id: "servco",
  name: "Servco",
  tier: "silver",
  url: "https://www.servco.com/",
  description:
    "Founded in Waialua in 1919, Servco is a family-owned Hawaiʻi company spanning automotive, mobility, and community investment.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/32e2200865ed4e21f62e6af1065d62c4b8f2fd23-720x143.png",
  logoAspect: 5.03,
};

const ZIPPYS: Sponsor = {
  _id: "zippys",
  name: "Zippy's",
  tier: "silver",
  url: "https://www.zippys.com/",
  description:
    "A Hawaiʻi favorite for nearly 60 years, bringing people together with local comfort food and genuine aloha across the islands.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/af8497356887341d05af6edbfa465ac8fd51970d-4167x1250.png",
  logoAspect: 3.33,
};

const PURPLE_MAIA: Sponsor = {
  _id: "purple-maia",
  name: "Purple Maiʻa Foundation",
  tier: "silver",
  url: "https://www.purplemaia.org",
  description:
    "A nonprofit educating culturally grounded technology makers, entrepreneurs, and problem solvers across Hawaiʻi.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/5a7aaf85359391dc6d9333e5c6056ec9234c2eb3-750x149.png",
  logoAspect: 5.03,
  logoScale: 1.38,
};

const ANTHOLOGY: Sponsor = {
  _id: "anthology-finn",
  name: "Anthology Finn Partners",
  tier: "bronze",
  url: "https://anthologyfinnpartners.com/",
  description:
    "A Honolulu-based integrated marketing firm offering advertising, public relations, digital marketing, and research services.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/9bfb7301ba8ca9243ba92d88dfb3653fbd0fe38d-560x244.png",
  logoAspect: 2.3,
};

const CHRIS_OTA: Sponsor = {
  _id: "chris-ota",
  name: "Chris Ota",
  tier: "bronze",
  url: "https://www.linkedin.com/in/chrisota/",
  description:
    "A Hawaiʻi-raised designer based in San Francisco and a steady champion of the islands' design and tech ʻohana.",
  logo: "https://cdn.sanity.io/images/evh83z0t/production/b4466a7d538a4388341fc3548b8c8cc478e3c426-885x87.png",
  logoAspect: 10.17,
};

/**
 * The section as the page mounts it: intro, the repeated "Become a sponsor"
 * CTA, then one labelled block per populated tier, in TIER_ORDER. Two tiers
 * and abridged blurbs, so the whole section fits one frame — the live page
 * runs five tiers deep with the full Sanity descriptions.
 */
export const Tiers = () => (
  <SponsorsGrid
    sponsors={[
      { ...HTDC, description: "A state agency accelerating Hawaiʻi's tech industry." },
      { ...SANDBOX, description: "Hawaiʻi's front door to creativity and technology." },
      {
        ...ANTHOLOGY,
        description:
          "A Honolulu-based integrated marketing firm offering advertising, public relations, and digital marketing.",
      },
      {
        ...CHRIS_OTA,
        description:
          "A Hawaiʻi-raised designer in San Francisco and a champion of the islands' design and tech ʻohana.",
      },
    ]}
  />
);

/**
 * Why the card normalises logos rather than trusting the asset. These four sit
 * in one row on the live site: a 10:1 wordmark, a 2.3:1 stacked lockup that
 * earns the taller 48px box, a logo Sanity scales up by 1.38, and an untouched
 * 3.3:1. Every one lands inside the same 140×48 envelope.
 */
export const LogoNormalisation = () => (
  <SponsorsGrid
    sponsors={[
      { ...CHRIS_OTA, tier: "silver" },
      { ...ANTHOLOGY, tier: "silver" },
      PURPLE_MAIA,
      ZIPPYS,
    ]}
  />
);

/**
 * A sponsor confirmed before their logo arrives. The card drops the logo box
 * and sets the name as the mark, so the tier row keeps its rhythm instead of
 * showing a hole.
 */
export const LogoPending = () => (
  <SponsorsGrid
    sponsors={[
      HTDC,
      {
        _id: "pending",
        name: "Hidden Gears",
        tier: "platinum",
        url: "https://www.hiddengears.com/",
        description:
          "A Honolulu-based Shopify agency helping brands grow through ecommerce strategy, design, development, and AI.",
      },
    ]}
  />
);
