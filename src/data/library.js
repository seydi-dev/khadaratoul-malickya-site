/**
 * The community's document library — recueils, livrets, and other reference
 * documents made available for download in their original layout.
 *
 * Why documents are offered as downloads rather than retyped on the page:
 * many of these PDFs are calligraphic Arabic documents whose text is stored
 * in a scrambled character order internally (a common issue with justified
 * Arabic typesetting). Re-transcribing them risks introducing errors into
 * religious text, so the original file is hosted unaltered instead.
 *
 * Add a new document by adding an entry here — the library page picks it
 * up automatically.
 */
export const LIBRARY = [
  {
    id: "tayssir",
    title: {
      fr: "Tayssir — Recueil de la Khadara",
      en: "Tayssir — Khadara Collection",
    },
    author: "Cheikh Seyidil Hadj Malick Sy (1855–1922)",
    description: {
      fr: "Wassilatul Mûna (Taissir), Allâhu Hasbi, Fanadjina",
      en: "Wassilatul Mûna (Taissir), Allâhu Hasbi, Fanadjina",
    },
    contents: [],
    cover: "/images/library/tayssir-cover.jpg",
    fileUrl: "/documents/tayssir-recueil-khadara.pdf",
    pages: 67,
  },
  {
    id: "bourde",
    title: {
      fr: "bourde — Recueil de la Khadara",
      en: "bourde — Khadara Collection",
    },
    author: "Imam Al-Boussiri (1211-1294)",
    description: {
      fr: "Falabouda",
      en: "Falabouda",
    },
    contents: [],
    cover: "/images/library/bourde-cover.jpg",
    fileUrl: "/documents/bourde.pdf",
    pages: 67,
  },
];
