import fs from "fs";
import path from "path";
import GalleryContent from "@/components/GalleryContent";

const FOLDER = path.join(process.cwd(), "public", "images", "gallery");
const IMAGE_FILE = /\.(jpe?g|png|webp)$/i;

function readFolderPhotos() {
  if (!fs.existsSync(FOLDER)) return [];
  return fs
    .readdirSync(FOLDER)
    .filter((name) => IMAGE_FILE.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/images/gallery/${encodeURIComponent(name)}`);
}

export default function GalleryPage() {
  return <GalleryContent photos={readFolderPhotos()} />;
}
