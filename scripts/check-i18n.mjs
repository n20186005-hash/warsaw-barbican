#!/usr/bin/env node
/* Parity check for the 5 locale message files (pl/en/zh/ru/de). */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["pl", "en", "zh", "ru", "de"];

const files = Object.fromEntries(
  locales.map((loc) => [loc, JSON.parse(readFileSync(join(root, "src", "messages", `${loc}.json`), "utf8"))])
);

function* leaves(obj, prefix = "") {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      yield [key, v.length, "array"];
    } else if (v && typeof v === "object") {
      yield* leaves(v, key);
    } else {
      yield [key, String(v), "leaf"];
    }
  }
}

const ref = files[locales[0]];
const refLeaves = [...leaves(ref)];
let pass = true;
let missing = 0;

for (const loc of locales) {
  const current = files[loc];
  const map = new Map([...leaves(current)].map(([k, v, t]) => [k, [v, t]]));
  for (const [key, value, type] of refLeaves) {
    const entry = map.get(key);
    if (!entry) {
      console.error(`MISSING in ${loc}: ${key}`);
      missing++;
      pass = false;
    } else if (entry[1] !== type) {
      console.error(`TYPE MISMATCH in ${loc}: ${key}`);
      pass = false;
    } else if (type === "array" && entry[0] !== value) {
      console.error(`ARRAY LENGTH MISMATCH in ${loc}: ${key} (${entry[0]} !== ${value})`);
      pass = false;
    }
  }
}

const totalLeaves = refLeaves.length;
if (pass) {
  console.log(`PASS: ${locales.length} locales, ${totalLeaves} keys/lists parity OK.`);
  process.exit(0);
} else {
  console.error(`FAIL: ${missing} missing keys (other mismatches above).`);
  process.exit(1);
}
