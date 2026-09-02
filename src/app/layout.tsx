import type { Metadata } from "next";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "Warsaw Barbican — Visitor Guide & History",
    template: "%s",
  },
  description:
    "Independent visitor guide to the Warsaw Barbican (Barbakan Warszawski): opening hours, tickets, history, photos and a self-guided Old Town walking route.",
  applicationName: "Warsaw Barbican Guide",
  formatDetection: { telephone: false },
};

// The root layout is a pass-through: the [locale] layout renders <html> with the
// correct lang attribute, per the next-intl App Router pattern.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
