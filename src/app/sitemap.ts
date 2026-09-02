import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

const locales = ["pl", "en", "zh", "ru", "de"] as const;

const staticPaths = ["", "privacy-policy", "terms-of-service", "cookie-settings"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-02");

  return locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.baseUrl}/${locale}${path ? `/${path}` : ""}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.baseUrl}/${l}${path ? `/${path}` : ""}`])
        ),
      },
    }))
  );
}
