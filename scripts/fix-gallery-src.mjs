// Point every gallery items[].src at the compressed JPEG files:
// /gallery/warsaw-barbican-<n>.svg -> /gallery/warsaw-barbican-<n>.jpg (n = 1-based order)
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const locales = ["en", "pl", "zh", "ru", "de"];

for (const locale of locales) {
  const fp = path.join(root, "src", "messages", `${locale}.json`);
  let text = fs.readFileSync(fp, "utf8");

  let n = 0;
  const fixed = text.replace(
    /\/gallery\/warsaw-barbican-[^"]*\.svg/g,
    () => `/gallery/warsaw-barbican-${++n}.jpg`
  );

  fs.writeFileSync(fp, fixed);
  console.log(`${locale}.json: rewrote ${n} gallery src references -> warsaw-barbican-1..${n}.jpg`);
}
