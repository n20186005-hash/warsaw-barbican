// Compress raw gallery photos (public/gallery/images (N).jpg) into
// SEO-friendly warsaw-barbican-N.jpg files (max edge 1600px, mozjpeg q82, progressive).
// Usage: node scripts/optimize-gallery.mjs [--probe] [--max-edge 1600] [--quality 82]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const galleryDir = path.join(root, "public", "gallery");

const args = process.argv.slice(2);
const probe = args.includes("--probe");
const maxEdge = parseInt(args[args.indexOf("--max-edge") + 1] ?? "1600", 10);
const quality = parseInt(args[args.indexOf("--quality") + 1] ?? "82", 10);

const rawFiles = fs
  .readdirSync(galleryDir)
  .filter((f) => /^images\s*\(\d+\)\.jpg$/i.test(f))
  .sort(
    (a, b) =>
      parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10)
  );

if (rawFiles.length === 0) {
  console.log("No raw 'images (N).jpg' files found in public/gallery — nothing to do.");
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (let i = 0; i < rawFiles.length; i++) {
  const src = path.join(galleryDir, rawFiles[i]);
  const meta = await sharp(src).metadata();
  const before = fs.statSync(src).size;

  if (probe) {
    console.log(
      `${i + 1}. ${rawFiles[i]}  ${meta.width}x${meta.height}  ${(before / 1024 / 1024).toFixed(2)} MB`
    );
    continue;
  }

  const out = path.join(galleryDir, `warsaw-barbican-${i + 1}.jpg`);
  const tmp = `${out}.tmp.jpg`;
  await sharp(src)
    .rotate() // honour EXIF orientation
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(tmp);
  fs.renameSync(tmp, out); // avoid O_TRUNC interception on direct writes

  const after = fs.statSync(out).size;
  totalBefore += before;
  totalAfter += after;
  console.log(
    `${i + 1}. ${rawFiles[i]}  ${meta.width}x${meta.height}  ${(before / 1024 / 1024).toFixed(2)} MB -> warsaw-barbican-${i + 1}.jpg ${(after / 1024).toFixed(0)} KB`
  );
}

if (!probe) {
  console.log(
    `\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% smaller, ${rawFiles.length} files)`
  );
}
