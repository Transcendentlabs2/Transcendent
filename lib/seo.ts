const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://transcendent-gold.vercel.app";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = "Transcendent Labs";

export const SITE_DESCRIPTION =
  "Research peptides and laboratory compounds with product-level analytical documentation, batch traceability, public COA records when available, and research-use-only guidance.";

export const RESEARCH_FEED_URL = `${SITE_URL}/research/feed.xml`;

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";

export const BING_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "";
