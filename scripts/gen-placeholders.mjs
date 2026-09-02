#!/usr/bin/env node
/* Generate 14 SVG placeholder images for the gallery (offline-safe). */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "gallery");
mkdirSync(outDir, { recursive: true });

const colors = [
  "#3a7a8d", "#4a8fa3", "#a3452f", "#b5624a", "#2f5d6e", "#8a3d2b",
  "#5a92a4", "#c8a96a", "#7d3523", "#3f7180", "#6f8f99", "#9a4a36",
  "#2b5f70", "#54717c",
];

for (let i = 1; i <= 14; i++) {
  const c = colors[i - 1];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="${c}"/>
  <path d="M0 620 L1200 480 L1200 800 L0 800 Z" fill="rgba(255,255,255,0.12)"/>
  <path d="M480 200 L720 200 L720 380 L480 380 Z" fill="rgba(255,255,255,0.18)"/>
  <path d="M520 380 L680 380 L640 520 L560 520 Z" fill="rgba(31,45,51,0.35)"/>
  <text x="600" y="600" font-family="Georgia, serif" font-size="56" fill="#ffffff" text-anchor="middle" opacity="0.92">Warsaw Barbican</text>
  <text x="600" y="660" font-family="sans-serif" font-size="26" fill="#ffffff" text-anchor="middle" opacity="0.75">Placeholder photo ${i} of 14 — replace with a real photo</text>
</svg>`;
  writeFileSync(join(outDir, `warsaw-barbican-${i}.svg`), svg);
}

console.log(`Generated 14 SVG placeholders in ${outDir}`);
