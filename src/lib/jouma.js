/**
 * Khadaratoul Jouma — automatic running order.
 *
 * The whole programme is derived from the Maghrib prayer (sunset), which is
 * computed for Trois-Rivières. Two running orders exist:
 *
 *   SUMMER                            WINTER
 *   Wasifa        Maghrib − 1 h 50    Khadara       Maghrib − 1 h 15
 *   Khadara       Maghrib − 1 h 15    Maghrib       exact time
 *   Maghrib       exact time          Wasifa        Maghrib + 15 min (45 min long)
 *   Taissir/Fala. Maghrib + 15 min    Taissir/Fala. after the Wasifa
 *   Mot de la fin after Taissir       Mot de la fin after Taissir
 *   Souper        30 min after the end of the programme
 *
 * Adjust the durations below if the real timings change — everything else
 * recalculates on its own.
 */

import { getSunset, formatTime, isSummerSchedule, TROIS_RIVIERES } from "./prayer";

/** Minutes. Change these if the community's timings evolve. */
export const DURATIONS = {
  khadaraBeforeMaghrib: 75, // 1 h 15 before Maghrib (both seasons)
  wasifaBeforeKhadara: 35, // summer only — Wasifa starts before the Khadara
  taissirAfterMaghrib: 15, // summer only — Taissir & Falabouda after the prayer
  wasifaAfterMaghrib: 15, // winter only — Wasifa after the prayer
  wasifaLength: 45, // winter only — the Wasifa lasts 45 minutes
  taissirLength: 45, // how long Taissir & Falabouda runs before the closing word
  souperAfterEnd: 30, // supper, 30 minutes after the programme ends
};

const shift = (date, minutes) => new Date(date.getTime() + minutes * 60000);

/**
 * Builds the full running order for a given date.
 * @returns {{season:'summer'|'winter', maghrib:Date, steps:Array}}
 */
export function buildJoumaProgram(date = new Date(), location = TROIS_RIVIERES) {
  const maghrib = getSunset(date, location);
  if (!maghrib) return null;

  const summer = isSummerSchedule(maghrib, location.timeZone);
  const D = DURATIONS;
  const steps = [];

  if (summer) {
    const khadara = shift(maghrib, -D.khadaraBeforeMaghrib);
    const wasifa = shift(khadara, -D.wasifaBeforeKhadara);
    const taissir = shift(maghrib, D.taissirAfterMaghrib);
    const motFin = shift(taissir, D.taissirLength);
    const souper = shift(motFin, D.souperAfterEnd);

    steps.push(
      { key: "wasifa", at: wasifa },
      { key: "khadara", at: khadara },
      { key: "maghrib", at: maghrib, highlight: true },
      { key: "taissir", at: taissir },
      { key: "motfin", at: motFin },
      { key: "souper", at: souper }
    );
  } else {
    const khadara = shift(maghrib, -D.khadaraBeforeMaghrib);
    const wasifa = shift(maghrib, D.wasifaAfterMaghrib);
    const taissir = shift(wasifa, D.wasifaLength);
    const motFin = shift(taissir, D.taissirLength);
    const souper = shift(motFin, D.souperAfterEnd);

    steps.push(
      { key: "khadara", at: khadara },
      { key: "maghrib", at: maghrib, highlight: true },
      { key: "wasifa", at: wasifa },
      { key: "taissir", at: taissir },
      { key: "motfin", at: motFin },
      { key: "souper", at: souper }
    );
  }

  return { season: summer ? "summer" : "winter", maghrib, steps };
}

/** Labels for each step, in both languages. */
export const STEP_LABELS = {
  wasifa: { fr: "Wasifa", en: "Wasifa" },
  khadara: { fr: "Khadara", en: "Khadara" },
  maghrib: { fr: "Prière de Maghreb", en: "Maghrib prayer" },
  taissir: { fr: "Taissir et Falabouda", en: "Taissir and Falabouda" },
  motfin: { fr: "Mot de la fin", en: "Closing word" },
  souper: { fr: "Souper", en: "Supper" },
};

export { formatTime };
