import fs from "fs";
import path from "path";
import { ALBUMS } from "@/data/gallery";
import GalleryContent from "@/components/GalleryContent";

const FOLDER = path.join(process.cwd(), "public", "images", "gallery");
const IMAGE_FILE = /\.(jpe?g|png|webp)$/i;

function folderTitle(name) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function listPhotos(dir, urlBase) {
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_FILE.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => ({ src: `${urlBase}/${encodeURIComponent(name)}`, file: name }));
}

function readAlbums() {
  if (!fs.existsSync(FOLDER)) return [];

  const albums = fs
    .readdirSync(FOLDER, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const info = ALBUMS[entry.name] || {};
      const fallback = folderTitle(entry.name);
      return {
        id: entry.name,
        title: info.title || { fr: fallback, en: fallback },
        date: info.date || "",
        photos: listPhotos(
          path.join(FOLDER, entry.name),
          `/images/gallery/${encodeURIComponent(entry.name)}`
        ),
      };
    })
    .filter((album) => album.photos.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.fr.localeCompare(b.title.fr));

  const loose = listPhotos(FOLDER, "/images/gallery");
  if (loose.length > 0) {
    albums.push({
      id: "autres-photos",
      title: { fr: "Autres photos", en: "Other photos" },
      date: "",
      photos: loose,
    });
  }
  return albums;
}

export default function GalleryPage() {
  return <GalleryContent albums={readAlbums()} />;
}
