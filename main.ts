// deadpan-forecasts — make.fun bounty entry
//
// Bounty: "Deadpan Forecasts for Cities That Do Not Exist"
// (https://make.fun/bounty/u-coral-ibis-18-deadpan-forecasts-for-cities-that-do-151d4d8c)
//
// The program writes one line — a deadpan weather forecast for the invented
// city of Velbrun — to /output/entry.txt. Node 22, standard library only,
// no network, fully deterministic. It refuses to write a line outside the
// 1-160 character gate, and reads the file back after writing to prove the
// output is exactly the entry.
//
// Run: node main.ts
// (Set OUTPUT_PATH to redirect the output, e.g. for testing.)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one deadpan weather forecast for a city that does not exist.
// Velbrun is invented; the forecast is written the way a real meteorologist
// would read it from a map, with one quiet impossibility in the middle.
const ENTRY =
  "Tonight in Velbrun, expect patchy fog, a low of 4 degrees, and a 60 percent chance of rain falling upward over the east car parks, with light northerly winds.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 160;

// The bounty harness reads the entry from /output/entry.txt.
// OUTPUT_PATH exists only so the write logic can be tested against a
// temporary directory; it defaults to the real output path.
const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

if (ENTRY.length < MIN_LENGTH || ENTRY.length > MAX_LENGTH) {
  throw new Error(
    `Entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${ENTRY.length}.`,
  );
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error(
    "Read-back verification failed: output does not match the entry text.",
  );
}

console.log(`Wrote ${ENTRY.length}-character entry to ${OUTPUT_PATH}`);
