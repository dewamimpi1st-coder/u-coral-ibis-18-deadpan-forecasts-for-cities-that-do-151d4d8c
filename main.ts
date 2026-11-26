// Entry for the make.fun bounty "Deadpan Forecasts for Cities That Do Not Exist"
// (https://make.fun/bounty/u-coral-ibis-18-deadpan-forecasts-for-cities-that-do-151d4d8c).
//
// The program writes exactly one line — a deadpan weather forecast for the
// invented city of Velbrun — to /output/entry.txt. Velbrun does not exist;
// everything else in the line is the plain, confident language of a real
// broadcast forecast, with the one impossibility (rain falling upward)
// delivered deadpan in the middle, where a forecaster would put the
// precipitation detail. That is the whole joke, and the whole entry.
//
// Node 22, standard library only, no network, fully deterministic. Two
// safety checks guard the output: checkLength() throws if the line falls
// outside the bounty's 1-160 character gate, and verifyWritten() reads the
// file back after writing and throws if it differs from the entry by even
// one character, so a bad write can never pass silently.
//
// Run: node main.ts
// Test against a temp dir: OUTPUT_PATH=/tmp/out/entry.txt node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Tonight in Velbrun, expect patchy fog, a low of 4 degrees, and a 60 percent chance of rain falling upward over the east car parks, with light northerly winds.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;

// The bounty harness reads the entry from /output/entry.txt. OUTPUT_PATH is
// only a test hook so the write logic can be exercised against a temp dir.
const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

function checkLength(text) {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `Entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}.`,
    );
  }
}

function writeEntry(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
}

function verifyWritten(path, text) {
  const back = readFileSync(path, "utf8");
  if (back !== text) {
    throw new Error("Read-back failed: file contents do not match the entry.");
  }
}

function main() {
  checkLength(ENTRY);
  writeEntry(OUTPUT_PATH, ENTRY);
  verifyWritten(OUTPUT_PATH, ENTRY);
  console.log(`Wrote ${ENTRY.length}-character entry to ${OUTPUT_PATH}`);
}

main();
