import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Transcendent Labs",
    short_name: "Transcendent",
    description:
      "Research peptides and laboratory compounds with analytical documentation and batch traceability.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    lang: "en-US",
    categories: ["science", "research", "laboratory"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
