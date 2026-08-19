/**
 * Maghrib (sunset) calculation — NOAA solar position algorithm.
 *
 * No external API and no network call: the time is computed from the date and
 * the coordinates, then rendered in the local timezone (which handles the
 * switch between EST and EDT automatically).
 *
 * Maghrib begins at sunset. We apply the standard solar zenith of 90.833°,
 * which accounts for atmospheric refraction and the sun's apparent radius.
 */

export const TROIS_RIVIERES = {
  latitude: 46.3432,
  longitude: -72.5477,
  timeZone: "America/Toronto",
  label: "Trois-Rivières, Québec",
};

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

/**
 * Integer day number since J2000.0, as required by the NOAA formula.
 * Julian days start at noon, so the +0.5 keeps midnight-based dates on the
 * correct day instead of shifting the result by half a day.
 */
function daysSinceJ2000(date) {
  const utcMidnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  const julianDate = utcMidnight / 86400000 + 2440587.5;
  return Math.round(julianDate - 2451545.0 + 0.0008);
}

/**
 * Sunset for a given date and location.
 * @returns {Date} a Date object at the exact sunset instant (UTC internally).
 */
export function getSunset(date, { latitude, longitude } = TROIS_RIVIERES) {
  const n = daysSinceJ2000(date);

  // Mean solar noon at the given longitude
  const Jstar = n - longitude / 360;

  // Solar mean anomaly
  const M = (357.5291 + 0.98560028 * Jstar) % 360;

  // Equation of the centre
  const C =
    1.9148 * Math.sin(rad(M)) +
    0.02 * Math.sin(rad(2 * M)) +
    0.0003 * Math.sin(rad(3 * M));

  // Ecliptic longitude
  const lambda = (M + C + 180 + 102.9372) % 360;

  // Solar transit (true solar noon)
  const Jtransit =
    2451545.0 +
    Jstar +
    0.0053 * Math.sin(rad(M)) -
    0.0069 * Math.sin(rad(2 * lambda));

  // Declination of the sun
  const sinDec = Math.sin(rad(lambda)) * Math.sin(rad(23.4397));
  const dec = Math.asin(sinDec);

  // Hour angle for the sunset zenith (90.833° = refraction + solar disc)
  const cosOmega =
    (Math.sin(rad(-0.833)) - Math.sin(rad(latitude)) * sinDec) /
    (Math.cos(rad(latitude)) * Math.cos(dec));

  // Polar day / polar night guard (never happens at this latitude, but safe)
  if (cosOmega > 1 || cosOmega < -1) return null;

  const omega = deg(Math.acos(cosOmega));
  const Jset = Jtransit + omega / 360;

  // Julian day -> JS Date
  const ms = (Jset - 2440587.5) * 86400000;
  return new Date(ms);
}

/** Formats a Date in the community's timezone, e.g. "19 h 58" (fr) / "7:58 PM" (en). */
export function formatTime(date, lang = "fr", timeZone = TROIS_RIVIERES.timeZone) {
  if (!date) return "—";
  if (lang === "fr") {
    const parts = new Intl.DateTimeFormat("fr-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone,
    }).formatToParts(date);
    const h = parts.find((p) => p.type === "hour")?.value ?? "00";
    const m = parts.find((p) => p.type === "minute")?.value ?? "00";
    return `${parseInt(h, 10)} h ${m}`;
  }
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}

/**
 * True when the given date falls in daylight saving time (EDT) for the
 * community's timezone. We use this to switch between the summer and the
 * winter running order of the Khadaratoul Jouma.
 */
export function isSummerSchedule(date, timeZone = TROIS_RIVIERES.timeZone) {
  const nameOf = (d) =>
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
      .formatToParts(d)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  const jan = new Date(Date.UTC(date.getUTCFullYear(), 0, 15, 17));
  const jul = new Date(Date.UTC(date.getUTCFullYear(), 6, 15, 17));
  const now = nameOf(date);
  // If the abbreviation differs from January's, we are on summer time.
  return now !== nameOf(jan) || nameOf(jan) === nameOf(jul);
}

/** Returns the date of the next Friday (or today, if today is Friday). */
export function nextFriday(from = new Date()) {
  const d = new Date(from);
  const day = d.getDay(); // 0 = Sunday ... 5 = Friday
  const delta = (5 - day + 7) % 7;
  d.setDate(d.getDate() + delta);
  d.setHours(12, 0, 0, 0);
  return d;
}
