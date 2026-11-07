import { ImageResponse } from "next/og";
import { T } from "@/data/translations";
import { buildJoumaProgram, STEP_LABELS } from "@/lib/jouma";
import { formatTime, TROIS_RIVIERES } from "@/lib/prayer";

export const dynamic = "force-dynamic";

const WIDTH = 1080;
const HEIGHT = 1230;
const ROW_HEIGHT = 120;

function fridayInTroisRivieres() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TROIS_RIVIERES.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = weekdays.indexOf(get("weekday"));
  const delta = (5 - day + 7) % 7;
  const base = Date.UTC(
    Number(get("year")),
    Number(get("month")) - 1,
    Number(get("day")),
    17
  );
  return new Date(base + delta * 86400000);
}

export async function GET() {
  const friday = fridayInTroisRivieres();
  const program = buildJoumaProgram(friday);
  const lang = "fr";

  const dateLabel = new Intl.DateTimeFormat("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TROIS_RIVIERES.timeZone,
  }).format(friday);

  const season =
    program.season === "summer" ? T.jo_summer[lang] : T.jo_winter[lang];
  const maghrib = `${T.jo_maghrib[lang]} ${formatTime(program.maghrib, lang)}`;

  const image = new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          background: "#faf7f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            height: 346,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a241b",
            borderBottom: "6px solid #b8892f",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#d9b871",
              letterSpacing: 2,
            }}
          >
            KHADARATOUL MALICKYA · TROIS-RIVIÈRES
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              color: "#ffffff",
              marginTop: 18,
            }}
          >
            {T.jo_card_title[lang]}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              color: "#d9b871",
              marginTop: 14,
            }}
          >
            {dateLabel}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 34,
            color: "#0f3527",
            marginTop: 40,
            marginBottom: 30,
          }}
        >
          {`${season} · ${maghrib}`}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 70px",
          }}
        >
          {program.steps.map((step) => (
            <div
              key={step.key}
              style={{
                height: ROW_HEIGHT,
                display: "flex",
                alignItems: "center",
                padding: "0 30px",
                background: step.highlight ? "#f3e7c9" : "transparent",
                borderBottom: "2px solid #e1dccf",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 300,
                  fontSize: 56,
                  color: step.highlight ? "#b8892f" : "#0f3527",
                }}
              >
                {formatTime(step.at, lang)}
              </div>
              <div style={{ display: "flex", fontSize: 40, color: "#0a241b" }}>
                {STEP_LABELS[step.key][lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );

  return new Response(image.body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
