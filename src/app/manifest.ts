import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Warsaw Barbican — Visitor Guide",
    short_name: "Warsaw Barbican",
    description: "Opening hours, tickets, history and walking routes for the Warsaw Barbican (Barbakan Warszawski).",
    start_url: "/pl",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3a7a8d",
    lang: "pl",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
