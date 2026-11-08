/**
 * Details for the files in public/audio/.
 * The key is the exact file name. A file without an entry still appears,
 * with its file name as title.
 *
 * date: "AAAA-MM-JJ" (optional)
 * category: an id from AUDIO_CATEGORIES (optional)
 */
export const AUDIOS = {
  "sope-naby.mp3": {
    title: "Rencontre Sope Naby Canada & Khadara Malickya Trois-Rivières",
    category: "rencontres",
  },
};

export const AUDIO_CATEGORIES = [
  { id: "rencontres", fr: "Rencontres", en: "Gatherings" },
  { id: "chants", fr: "Chants", en: "Chants" },
];
