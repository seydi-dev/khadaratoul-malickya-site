import fs from "fs";
import path from "path";
import { AUDIOS } from "@/data/audios";
import AudiosContent from "@/components/AudiosContent";

export const metadata = {
  title: "Chants et rencontres — Khadaratoul Malickya",
  description:
    "Écoutez et téléchargez les chants religieux et les enregistrements des rencontres de la Khadaratoul Malickya de Trois-Rivières.",
  openGraph: {
    title: "Chants et rencontres — Khadaratoul Malickya",
    description: "Chants religieux et enregistrements de nos rencontres, à écouter ou télécharger.",
    type: "website",
  },
};

const FOLDER = path.join(process.cwd(), "public", "audio");
const AUDIO_FILE = /\.(mp3|m4a|aac|ogg|wav)$/i;

function fileTitle(name) {
  return name
    .replace(AUDIO_FILE, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slug(name) {
  return name
    .replace(AUDIO_FILE, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readWaveform(name) {
  const file = path.join(FOLDER, name.replace(AUDIO_FILE, ".json"));
  if (!fs.existsSync(file)) return { peaks: null, duration: 0 };
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { peaks: data.peaks || null, duration: data.duration || 0 };
}

function readFolderAudios() {
  if (!fs.existsSync(FOLDER)) return [];
  return fs
    .readdirSync(FOLDER)
    .filter((name) => AUDIO_FILE.test(name))
    .map((name) => {
      const info = AUDIOS[name] || {};
      const wave = readWaveform(name);
      return {
        id: slug(name),
        file: name,
        src: `/audio/${encodeURIComponent(name)}`,
        title: info.title || fileTitle(name),
        date: info.date || "",
        category: info.category || "",
        size: fs.statSync(path.join(FOLDER, name)).size,
        duration: wave.duration,
        peaks: wave.peaks,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export default function AudiosPage() {
  return <AudiosContent audios={readFolderAudios()} />;
}
