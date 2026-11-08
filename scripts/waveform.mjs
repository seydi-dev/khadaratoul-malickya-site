import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const FOLDER = path.join(process.cwd(), "public", "audio");
const AUDIO_FILE = /\.(mp3|m4a|aac|ogg|wav)$/i;
const BARS = 200;
const RATE = 8000;
const WINDOW = RATE / 10;

function readLevels(file) {
  return new Promise((resolve, reject) => {
    const ff = spawn("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", String(RATE), "-f", "f32le", "-"]);
    const levels = [];
    let rest = Buffer.alloc(0);
    let sum = 0;
    let count = 0;
    let samples = 0;

    ff.stdout.on("data", (chunk) => {
      const buf = Buffer.concat([rest, chunk]);
      const usable = buf.length - (buf.length % 4);
      for (let i = 0; i < usable; i += 4) {
        const v = buf.readFloatLE(i);
        sum += v * v;
        count++;
        samples++;
        if (count === WINDOW) {
          levels.push(Math.sqrt(sum / count));
          sum = 0;
          count = 0;
        }
      }
      rest = buf.subarray(usable);
    });
    ff.on("error", reject);
    ff.on("close", (code) => {
      if (code !== 0) return reject(new Error(`ffmpeg a échoué (code ${code})`));
      resolve({ levels, duration: samples / RATE });
    });
  });
}

function toPeaks(levels) {
  const bars = [];
  for (let b = 0; b < BARS; b++) {
    const start = Math.floor((b * levels.length) / BARS);
    const end = Math.max(start + 1, Math.floor(((b + 1) * levels.length) / BARS));
    const slice = levels.slice(start, end);
    const mean = slice.reduce((a, v) => a + v, 0) / slice.length;
    bars.push(20 * Math.log10(mean + 1e-6));
  }
  const sorted = [...bars].sort((a, b) => a - b);
  const low = sorted[Math.floor(sorted.length * 0.05)] - 3;
  const high = sorted[sorted.length - 1];
  return bars.map((db) => {
    const v = Math.min(1, Math.max(0, (db - low) / (high - low || 1)));
    return Math.round((0.12 + 0.88 * Math.pow(v, 3)) * 100) / 100;
  });
}

const files = fs.readdirSync(FOLDER).filter((name) => AUDIO_FILE.test(name));

for (const name of files) {
  const out = path.join(FOLDER, name.replace(AUDIO_FILE, ".json"));
  if (fs.existsSync(out)) {
    console.log(`Déjà fait : ${name}`);
    continue;
  }
  console.log(`Analyse : ${name}`);
  const { levels, duration } = await readLevels(path.join(FOLDER, name));
  fs.writeFileSync(out, JSON.stringify({ duration: Math.round(duration), peaks: toPeaks(levels) }));
  console.log(`  -> ${path.basename(out)}`);
}
