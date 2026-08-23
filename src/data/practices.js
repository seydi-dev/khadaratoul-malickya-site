/**
 * ============================================================================
 * PRATIQUES SPIRITUELLES — CONTENU RELIGIEUX
 * ============================================================================
 *
 * SOURCE UNIQUE : le document « Tidjaniya : le wird tidjane — Le wird (lâzim),
 * la wazifa et le zikr (hadara) du vendredi » fourni par la communauté.
 *
 * RÈGLE ABSOLUE : ne rien inventer, ne rien simplifier, ne rien fusionner.
 * L'ordre des étapes et les nombres de répétitions viennent directement du PDF.
 *
 * NOTE SUR L'ARABE : le PDF encodait deux lettres avec des codepoints
 * persans/ourdous (ی au lieu de ي, ھ au lieu de ه). Ils ont été normalisés
 * vers l'orthographe arabe standard pour que le texte s'affiche correctement.
 * Aucun mot n'a été modifié.
 *
 * ⚠️ À COMPLÉTER PAR LA COMMUNAUTÉ — voir les champs marqués `null` :
 *   - wird.intentionFormula  → la formule d'intention de Cheikh Seydi El Hadj
 *                              Malick Sy (absente du PDF)
 *   - *.duaText              → le texte de l'invocation de fin (le PDF indique
 *                              seulement « réciter une invocation (dou'a) »)
 * Tant que ces champs valent `null`, le site affiche une note neutre au lieu
 * d'un texte inventé.
 * ============================================================================
 */

/* --- Formules réutilisées d'une pratique à l'autre --------------------- */

const AOUZOU = {
  arabic: "أعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمْ",
  translit: "A'oûzou billahi minna chaytânir radjîmi",
};

const FATIHA = {
  arabic: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
  translit: "Bismillahi Rahmâni Rahîmi — puis la sourate Al-Fâtiha",
};

const ASTAGHFIROULLAH_SHORT = {
  arabic: "أسْتَغْفِرُ اللَّه",
  translit: "Astaghfiroullah",
};

const ASTAGHFIROULLAH_LONG = {
  arabic:
    "أسْتَغْفِرُ اللّهَ العَظِيمَ الَّذِي لا إلهَ إلاّ هُوَ الحَيُّ القَيُّوم",
  translit:
    "Astaghfiroullah al 'azîmal lazî lâ ilâha illa houwal hayyoul qayyoum",
};

const SALATOUL_FATIHI = {
  arabic:
    "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا اُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إلَى صِرَاطِكَ الْمُسْتَقِيمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ",
  translit:
    "Allahoumma salli 'alâ Sayyidinâ Mouhammadine il fâtihi limâ oughliqa wal khâtimi limâ sabaqa nâçiril haqqi bil haqqi wal 'eudî ilâ sirâtikal moustaqîmi wa 'alâ âlihi haqqa qadrihi wa miqdari'il 'azîmi",
};

const SALAT_SIMPLE = {
  arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَسَلِّمْ",
  translit: "Allahoumma salli 'alâ Sayyidinâ Mouhammadine wa sallim",
};

const SOUBHANA = {
  arabic:
    "سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ وَسَلامٌ عَلَى الْمُرْسَلِينَ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  translit:
    "Soubhâna rabbika rabbil 'izzati 'ammâ yaçifoûna wa salamoune 'alal moursalina wal hamdoulillahi rabbil 'âlamine",
};

const TAHLIL = {
  arabic: "لا إلهَ إلاَّ اللّه",
  translit: "Lâ ilâha illal lâhou",
};

const INNALLAHA = {
  arabic:
    "إِنَّ اللَّهَ وَمَلائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا صَلَّى اللّهُ تَعَالَى عَلَيْهِ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ تَسْلِيمًا",
  translit:
    "Innallâha wa malâikatahou yousalloûna 'ala nabî yâ ayyouhal lazîna âmanou sallou 'alaïhi wa sallimou taslîmâ. Sallallâhou ta'alâ 'alaïhi wa 'alâ âlihi wa sahbihi wa sallama taslîmâ.",
};

const SHAHADA_LINE = {
  arabic: "سَيِّدِنَا مُحَمَّدٌ رَسُولُ اللهِ عَلَيْهِ سَلامُ اللهِ",
  translit: "Sayyidina Muhammad rasoul Allah wa alaihi sallam Allah",
};

const DJAWHARATOUL_KAMAL = {
  arabic:
    "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى عَيْنِ الرَّحْمَةِ الرَّبَّانِيَّةِ وَالْيَاقُوتَةِ الْمُتَحَقِّقَةِ الْحَائِطَةِ بِمَرْكَزِ الْفُهُومِ وَالْمَعَانِي وَنُورِ الْأَكْوَانِ الْمُتَكَوِّنَةِ الْآدَمِيِّ صَاحِبِ الْحَقِّ الرَّبَّانِيِّ الْبَرْقِ الْأَسْطَعِ بِمُزُونِ الْأَرْبَاحِ الْمَالِئَةِ لِكُلِّ مُتَعَرِّضٍ مِنَ الْبُحُورِ وَالْأَوَانِي وَنُورِكَ اللَّامِعِ الَّذِي مَلَأْتَ بِهِ كَوْنَكَ الْحَائِطَ بِأَمْكِنَةِ الْمَكَانِي. اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى عَيْنِ الْحَقِّ الَّتِي تَتَجَلَّى مِنْهَا عُرُوشُ الْحَقَائِقِ عَيْنِ الْمَعَارِفِ الْأَقْوَمِ صِرَاطِكَ التَّامِّ الْأَسْقَمِ. اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى طَلْعَةِ الْحَقِّ بِالْحَقِّ الْكَنْزِ الْأَعْظَمِ إِفَاضَتِكَ مِنْكَ إِلَيْكَ إِحَاطَةِ النُّورِ الْمُطَلْسَمِ صَلَّى اللَّهُ عَلَيْهِ وَعَلَى آلِهِ صَلَاةً تُعَرِّفُنَا بِهَا إِيَّاهُ",
  translit:
    "Allahoumma salli wa sallim 'alâ 'aïnir rahmatir rabbâniyyati wal yâqoutatil moutahaqqiqatil hâitati bimarkazil fouhoûmi wal ma'ânî wa noûril akwânil moutakawwinati ââdammiyyi sâhibil haqqir rabbâniyyil barqil asta'i bimouzoûnil arbâhil mâliati likoulli moutagharridine minal bouhoûri wal awâni wa nôurikal lâmighil lazî malata bihi kawnakal hâita biamkinatil makânî. Allahoumma salli wa sallim 'alâ 'aïnil haqqil latî tatadjallah min'â 'ourouchoul haqâiqi 'aïni ma'arifil aqwami sirâtika attâmil asqami. Allahoumma salli wa sallim 'alâ tal'atil haqqi bil haqqil kanezil a'zami ifâdatika minka ilaïka ihâdatin-noûril moutalsami salla lâhou 'alaïhi wa 'alâ âlihi salatane tou'arrifounâ bi'â iyyâ'ou",
};

/* --- Images disponibles ------------------------------------------------ */
const IMG = {
  seated: "/images/practices/seated-intention.jpg",
  beads: "/images/practices/beads.jpg",
  closing: "/images/practices/closing.jpg",
  khadara: "/images/practices/khadara-hero.jpg",
};

/* ======================================================================== */
/*  LE WIRD (LÂZIM)                                                         */
/* ======================================================================== */

export const WIRD = {
  id: "wird",
  slug: "/practices/wird",
  icon: "beads",
  cover: IMG.beads,
  name: { fr: "Le Wird (Lâzim)", en: "The Wird (Lâzim)" },
  short: { fr: "La récitation quotidienne", en: "The daily recitation" },
  obligation: { fr: "Obligatoire", en: "Obligatory" },

  intro: {
    fr: "Le Wird (lâzim) est effectué deux fois par jour dans la Tidjaniya : le matin, avant la prière de l'aube jusqu'à environ trois heures après le lever du soleil ; puis après la prière de 'Asr, jusqu'à environ quatre heures après le coucher du soleil.",
    en: "The Wird (lâzim) is performed twice a day in the Tidjaniya: in the morning, before the dawn prayer until about three hours after sunrise; then after the 'Asr prayer, until about four hours after sunset.",
  },

  /**
   * ⚠️ À COMPLÉTER : formule d'intention enseignée par Cheikh Seydi El Hadj
   * Malick Sy. Elle ne figure pas dans le PDF source et n'a pas été fournie.
   * Renseigner ici { arabic, translit, translation } le moment venu.
   */
  intentionFormula: {
    translit: [
      "Inni nawytou rabbi bit tilawah",
      "Zal wirda tahzimane lizil diala lah",
      "Kaza li idjla line wa libtigaai",
      "Mardaati kal oulyaa bila khafaai",
      "Khasdane liwadjhikal kaiimil haalii",
      "Wa moukhlisane laka mah ibtihaali",
      "Rabbi min adjlika wa khad akhoulou",
      "Bihousni imdaadika yaa moukhilou",
      "Awnika hawlika wa mah khouwatika",
      "Wa maa wahabtaniihi min nihamika",
      "Tawfiikhikal mardiouwwi moustahina",
      "Bika wa anta khairou man mouhina",
      "Aouzou bil lahi mina chaytani",
      "Radjiimikal lahiini zil houdwani",
    ],
    note: {
      fr: "Formule d'intention — Cheikh Seydi El Hadj Malick Sy",
      en: "Intention formula — Cheikh Seydi El Hadj Malick Sy",
    },
  },

  /** ⚠️ À COMPLÉTER : texte de l'invocation de fin de Wird. */
  duaText: null,

  steps: [
    {
      n: 1,
      image: IMG.seated,
      title: { fr: "Intention", en: "Intention" },
      body: {
        fr: "Être en état de pureté, s'asseoir comme en prière, se diriger vers la Qibla et formuler l'intention de réciter le Wird.",
        en: "Be in a state of purity, sit as in prayer, face the Qibla and form the intention to recite the Wird.",
      },
      formula: null,
      count: null,
    },
    {
      n: 2,
      image: IMG.seated,
      title: { fr: "A'oûzou billah", en: "A'oûzou billah" },
      body: {
        fr: "Chercher refuge auprès d'Allah contre Satan le lapidé.",
        en: "Seek refuge in Allah from Satan the accursed.",
      },
      formula: AOUZOU,
      count: 1,
    },
    {
      n: 3,
      image: IMG.seated,
      title: { fr: "Al-Fâtiha", en: "Al-Fâtiha" },
      body: {
        fr: "Dire la Basmala, puis réciter la sourate de l'ouverture.",
        en: "Say the Basmala, then recite the opening chapter.",
      },
      formula: FATIHA,
      count: 1,
    },
    {
      n: 4,
      image: IMG.beads,
      title: { fr: "Astaghfiroullah", en: "Astaghfiroullah" },
      body: {
        fr: "Répéter la formule de demande de pardon cent fois.",
        en: "Repeat the formula of seeking forgiveness one hundred times.",
      },
      formula: ASTAGHFIROULLAH_SHORT,
      count: 100,
    },
    {
      n: 5,
      image: IMG.beads,
      title: { fr: "Salâtoul Fâtihi", en: "Salâtoul Fâtihi" },
      body: {
        fr: "Prier sur le Prophète ﷺ cent fois. Le document recommande la Salâtoul Fâtihi pour ceux qui le peuvent, en lieu et place de la formule simple.",
        en: "Pray upon the Prophet ﷺ one hundred times. The document recommends the Salâtoul Fâtihi for those able to, in place of the simpler formula.",
      },
      formula: SALATOUL_FATIHI,
      alternate: {
        label: {
          fr: "Formule simple, si la Salâtoul Fâtihi n'est pas connue",
          en: "Simpler formula, if the Salâtoul Fâtihi is not known",
        },
        ...SALAT_SIMPLE,
      },
      count: 100,
    },
    {
      n: 6,
      image: IMG.seated,
      title: { fr: "Soubhâna rabbika", en: "Soubhâna rabbika" },
      body: {
        fr: "Réciter la formule de glorification une fois.",
        en: "Recite the formula of glorification once.",
      },
      formula: SOUBHANA,
      count: 1,
    },
    {
      n: 7,
      image: IMG.beads,
      title: { fr: "Lâ ilâha illal lâhou", en: "Lâ ilâha illal lâhou" },
      body: {
        fr: "Répéter la formule de l'Unicité cent fois.",
        en: "Repeat the formula of Divine Oneness one hundred times.",
      },
      formula: TAHLIL,
      count: 100,
    },
    {
      n: 8,
      image: IMG.closing,
      title: { fr: "Clôture et invocation", en: "Closing and invocation" },
      body: {
        fr: "Réciter les trois formules de clôture, puis une invocation (dou'a).",
        en: "Recite the three closing formulas, then an invocation (dou'a).",
      },
      formulaList: [SHAHADA_LINE, INNALLAHA, SOUBHANA],
      count: 1,
      isClosing: true,
    },
  ],
};

/* ======================================================================== */
/*  LA WAZIFA                                                               */
/* ======================================================================== */

export const WAZIFA = {
  id: "wazifa",
  slug: "/practices/wazifa",
  icon: "hands",
  cover: IMG.khadara,
  hero: IMG.khadara,
  name: { fr: "La Wazifa", en: "The Wazifa" },
  short: {
    fr: "La récitation obligatoire quotidienne",
    en: "The daily obligatory recitation",
  },
  obligation: { fr: "Obligatoire", en: "Obligatory" },

  intro: {
    fr: "La Wazifa est obligatoire une fois par jour, le matin ou le soir. Elle peut cependant être récitée matin et soir : le matin, après la prière de l'aube jusqu'à environ trois heures après le lever du soleil ; après la prière de 'Asr, jusqu'à environ quatre heures après le coucher du soleil.",
    en: "The Wazifa is obligatory once a day, morning or evening. It may however be recited both morning and evening: in the morning, after the dawn prayer until about three hours after sunrise; after the 'Asr prayer, until about four hours after sunset.",
  },

  /** ⚠️ À COMPLÉTER : texte de l'invocation de fin de Wazifa. */
  duaText: "",

  steps: [
    {
      n: 1,
      image: IMG.seated,
      title: { fr: "A'oûzou billah", en: "A'oûzou billah" },
      body: {
        fr: "Chercher refuge auprès d'Allah contre Satan le lapidé.",
        en: "Seek refuge in Allah from Satan the accursed.",
      },
      formula: AOUZOU,
      count: 1,
    },
    {
      n: 2,
      image: IMG.seated,
      title: { fr: "Al-Fâtiha", en: "Al-Fâtiha" },
      body: {
        fr: "Réciter la sourate de l'ouverture.",
        en: "Recite the opening chapter.",
      },
      formula: FATIHA,
      count: 1,
    },
    {
      n: 3,
      image: IMG.beads,
      title: { fr: "Astaghfiroullah al 'azîm", en: "Astaghfiroullah al 'azîm" },
      body: {
        fr: "Réciter la formule complète de demande de pardon trente fois.",
        en: "Recite the full formula of seeking forgiveness thirty times.",
      },
      formula: ASTAGHFIROULLAH_LONG,
      count: 30,
    },
    {
      n: 4,
      image: IMG.beads,
      title: { fr: "Salâtoul Fâtihi", en: "Salâtoul Fâtihi" },
      body: {
        fr: "Réciter la Salâtoul Fâtihi cinquante fois.",
        en: "Recite the Salâtoul Fâtihi fifty times.",
      },
      formula: SALATOUL_FATIHI,
      count: 50,
    },
    {
      n: 5,
      image: IMG.seated,
      title: { fr: "Soubhâna rabbika", en: "Soubhâna rabbika" },
      body: {
        fr: "Réciter la formule de glorification une fois.",
        en: "Recite the formula of glorification once.",
      },
      formula: SOUBHANA,
      count: 1,
    },
    {
      n: 6,
      image: IMG.beads,
      title: { fr: "Lâ ilâha illal lâhou", en: "Lâ ilâha illal lâhou" },
      body: {
        fr: "Répéter la formule de l'Unicité de Dieu cent fois.",
        en: "Repeat the formula of Divine Oneness one hundred times.",
      },
      formula: TAHLIL,
      count: 100,
    },
    {
      n: 7,
      image: IMG.beads,
      title: { fr: "Djawharatoul Kamal", en: "Djawharatoul Kamal" },
      body: {
        fr: "Réciter la Djawharatoul Kamal douze fois.",
        en: "Recite the Djawharatoul Kamal twelve times.",
      },
      formula: DJAWHARATOUL_KAMAL,
      count: 12,
      long: true,
    },
    {
      n: 8,
      image: IMG.closing,
      title: { fr: "Clôture et invocation", en: "Closing and invocation" },
      body: {
        fr: "Réciter la formule finale une fois, puis une invocation (dou'a).",
        en: "Recite the final formula once, then an invocation (dou'a).",
      },
      formulaList: [INNALLAHA, SOUBHANA],
      count: 1,
      isClosing: true,
    },
  ],
};

/* ======================================================================== */
/*  LE ZIKR (HADARA) DU VENDREDI — HADARATOUL DJOUMA                        */
/* ======================================================================== */

export const KHADARA = {
  id: "khadara",
  slug: "/practices/khadara",
  icon: "mosque",
  cover: IMG.khadara,
  hero: IMG.khadara,
  name: { fr: "Hadaratoul Djouma", en: "Hadaratoul Djouma" },
  short: { fr: "Le zikr du vendredi", en: "The Friday zikr" },
  obligation: {
    fr: "Facultatif seul — obligatoire en groupe si possible",
    en: "Optional alone — obligatory in group when possible",
  },

  intro: {
    fr: "Le zikr communément appelé Hadaratoul Djouma doit être récité le vendredi, entre la prière de 'Asr et le crépuscule (Maghrib). Il est recommandé de le faire en groupe, ou seul en cas d'empêchement.",
    en: "The zikr commonly called Hadaratoul Djouma is to be recited on Friday, between the 'Asr prayer and dusk (Maghrib). It is recommended to do it in a group, or alone if prevented.",
  },

  /** ⚠️ À COMPLÉTER : texte de l'invocation de fin de Hadara. */
  duaText: null,

  steps: [
    {
      n: 1,
      image: IMG.seated,
      title: { fr: "A'oûzou billah", en: "A'oûzou billah" },
      body: {
        fr: "Chercher refuge auprès d'Allah contre Satan le lapidé.",
        en: "Seek refuge in Allah from Satan the accursed.",
      },
      formula: AOUZOU,
      count: 1,
    },
    {
      n: 2,
      image: IMG.seated,
      title: { fr: "Al-Fâtiha", en: "Al-Fâtiha" },
      body: {
        fr: "Réciter la sourate de l'ouverture.",
        en: "Recite the opening chapter.",
      },
      formula: FATIHA,
      count: 1,
    },
    {
      n: 3,
      image: IMG.beads,
      title: { fr: "Astaghfiroullah al 'azîm", en: "Astaghfiroullah al 'azîm" },
      body: {
        fr: "Réciter la formule complète de demande de pardon trois fois.",
        en: "Recite the full formula of seeking forgiveness three times.",
      },
      formula: ASTAGHFIROULLAH_LONG,
      count: 3,
    },
    {
      n: 4,
      image: IMG.beads,
      title: { fr: "Salâtoul Fâtihi", en: "Salâtoul Fâtihi" },
      body: {
        fr: "Réciter la Salâtoul Fâtihi trois fois.",
        en: "Recite the Salâtoul Fâtihi three times.",
      },
      formula: SALATOUL_FATIHI,
      count: 3,
    },
    {
      n: 5,
      image: IMG.seated,
      title: { fr: "Soubhâna rabbika", en: "Soubhâna rabbika" },
      body: {
        fr: "Réciter la formule de glorification une fois.",
        en: "Recite the formula of glorification once.",
      },
      formula: SOUBHANA,
      count: 1,
    },
    {
      n: 6,
      image: IMG.khadara,
      title: { fr: "Lâ ilâha illal lâhou", en: "Lâ ilâha illal lâhou" },
      body: {
        fr: "Répéter la formule de l'Unicité de Dieu pendant un certain temps, après 'Asr et avant le Maghreb — par exemple une heure.",
        en: "Repeat the formula of Divine Oneness for a certain time, after 'Asr and before Maghrib — for example one hour.",
      },
      formula: TAHLIL,
      count: null,
      durationNote: {
        fr: "Un certain temps, entre 'Asr et le Maghreb (par exemple 1 heure)",
        en: "A certain time, between 'Asr and Maghrib (for example 1 hour)",
      },
    },
    {
      n: 7,
      image: IMG.closing,
      title: { fr: "Clôture et invocation", en: "Closing and invocation" },
      body: {
        fr: "Réciter la formule finale une fois, puis une invocation (dou'a).",
        en: "Recite the final formula once, then an invocation (dou'a).",
      },
      formulaList: [INNALLAHA, SOUBHANA],
      count: 1,
      isClosing: true,
    },
  ],
};

export const PRACTICES = [WIRD, WAZIFA, KHADARA];

export function getPractice(id) {
  return PRACTICES.find((p) => p.id === id) ?? null;
}
