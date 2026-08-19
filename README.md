# Khadaratoul Malickya — Trois-Rivières

A real, working **Next.js 14** website for the Khadaratoul Malickya community of Trois-Rivières, Québec.

Bilingual (French default / English), mobile-first, with an automatic Khadaratoul Jouma schedule computed from the real Maghrib prayer time.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
```

Verified: `npm run build` compiles with **zero errors**, all 8 pages prerendered as static content.

---

## Pages

| Route         | Page        | Contents |
|---------------|-------------|----------|
| `/`           | Accueil     | Hero, upcoming events with countdowns, intro, Jouma schedule, what we offer, quotes, join CTA |
| `/about`      | À propos    | Tidjaniyya path, Trois-Rivières history, three honoured figures, mission |
| `/program`    | Programme   | **Automatic Jouma schedule**, weekly Khadara & Wasifa, upcoming events |
| `/membership` | Adhésion    | Google Form button + QR code, six benefits, fee frequencies |
| `/structure`  | Structure   | The seven working cells |
| `/news`       | Actualités  | Maouloud, Gamou, gallery link |
| `/gallery`    | Galerie     | 9 event photos with lightbox |
| `/contact`    | Contact     | Meeting address + WhatsApp QR code |

---

## The automatic Jouma schedule

This is the part worth understanding. **No API and no network call** — the whole running order is computed from the date and the coordinates of Trois-Rivières.

- `src/lib/prayer.js` — computes sunset (Maghrib) using the NOAA solar algorithm, then renders it in `America/Toronto`, so the EST ⇄ EDT switch is handled for you. Accuracy is within a few minutes of published almanac times.
- `src/lib/jouma.js` — builds the running order from that Maghrib time.

Summer and winter use different running orders, selected automatically from daylight saving time:

**Summer** (example, Maghrib 19 h 50)

| Time | Step |
|------|------|
| 18 h 00 | Wasifa (35 min before the Khadara) |
| 18 h 35 | Khadara (1 h 15 before Maghrib) |
| 19 h 50 | **Prière de Maghreb** |
| 20 h 05 | Taissir et Falabouda (15 min after) |
| 20 h 50 | Mot de la fin |
| 21 h 20 | Souper (30 min after the end) |

**Winter** (example, Maghrib 16 h 04)

| Time | Step |
|------|------|
| 14 h 49 | Khadara (1 h 15 before Maghrib) |
| 16 h 04 | **Prière de Maghreb** |
| 16 h 19 | Wasifa (15 min after, lasts 45 min) |
| 17 h 04 | Taissir et Falabouda |
| 17 h 49 | Mot de la fin |
| 18 h 19 | Souper (30 min after the end) |

### Adjusting the timings

Everything is in one object — `DURATIONS` in `src/lib/jouma.js`:

```js
export const DURATIONS = {
  khadaraBeforeMaghrib: 75, // 1 h 15 before Maghrib (both seasons)
  wasifaBeforeKhadara: 35,  // summer only
  taissirAfterMaghrib: 15,  // summer only
  wasifaAfterMaghrib: 15,   // winter only
  wasifaLength: 45,         // winter only
  taissirLength: 45,        // before the closing word
  souperAfterEnd: 30,       // supper after the programme ends
};
```

Change a number, and every displayed time recalculates on its own.

> **Note:** the length of *Taissir et Falabouda* (`taissirLength`) wasn't specified, so it defaults to 45 minutes. Adjust it if the real duration differs — the "Mot de la fin" and "Souper" times follow from it.

---

## Project structure

```
src/
  app/
    layout.js            wraps every page in the AppShell
    globals.css          the whole design system (colours, type, components)
    page.js              /            Accueil
    about/page.js        /about
    program/page.js      /program
    membership/page.js   /membership
    structure/page.js    /structure
    news/page.js         /news
    gallery/page.js      /gallery
    contact/page.js      /contact

  components/
    AppShell.js          header + menu + footer + bottom nav
    Header.js            logo, FR/EN switch, desktop nav, transparent over the hero
    MenuSheet.js         full-screen mobile menu
    BottomNav.js         mobile bottom tab bar
    Footer.js
    JoumaProgram.js      the automatic Friday schedule card
    CountdownClock.js    live Days / Hours / Min / Sec countdown
    EventCard.js         event + countdown
    QuoteCarousel.js     rotating quotes
    CtaBand.js           the "Devenir un membre" band
    Lightbox.js          gallery image viewer
    Reveal.js            fade-in on scroll
    PageHead.js          dark banner at the top of inner pages
    Icon.js              all line icons

  context/
    LanguageContext.js   FR/EN state, no external i18n library

  data/
    site.js              name, address, Google Form URL   <- edit here first
    nav.js               the 8 pages
    events.js            upcoming events
    quotes.js            the two quotes
    cells.js             the seven cells
    translations.js      every string, FR + EN

  lib/
    prayer.js            sunset / Maghrib calculation
    jouma.js             the running-order builder

public/images/           logo (2 variants), QR codes, portraits, posters, gallery
```

---

## Editing content

Almost everything is data, not markup:

- **Address, community name, Google Form link** → `src/data/site.js`
- **Events** (add, remove, change dates) → `src/data/events.js`
- **Quotes** → `src/data/quotes.js`
- **The seven cells** → `src/data/cells.js`
- **Any text on the site** → `src/data/translations.js` (`{ fr: "...", en: "..." }`)
- **Colours, spacing, fonts** → the CSS variables at the top of `src/app/globals.css`

To swap an image, replace the file in `public/images/` keeping the same name.

---

## Logo

Two variants are generated from the official logo:

- `logo.png` — full colour, used on light backgrounds (header once scrolled)
- `logo-light.png` — ivory version, used on dark green (hero, mobile menu, footer)

The second exists because the wordmark is dark green and would otherwise disappear against the dark background.

---

## Deploying

Push to GitHub, then import the repository on [vercel.com](https://vercel.com) (built by the Next.js team; the free tier is plenty for this site). Every push redeploys automatically.

Any static host works too — `npm run build` produces fully static pages.

---

## Notes

- **No social media icons.** Only the WhatsApp QR code, as requested.
- **No donation or resources section.**
- **No "contact à définir" placeholders** anywhere.
- The Jouma schedule is computed in the browser, so visitors always see the current week rather than a date frozen at build time.
