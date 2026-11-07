import { TROIS_RIVIERES } from "./prayer";

const WIDTH = 1080;
const HEIGHT = 1230;
const ROW_HEIGHT = 120;

const clean = (text) => String(text).replace(/[  ]/g, " ");

function wrapText(ctx, text, maxWidth) {
  const lines = [];
  let line = "";
  clean(text)
    .split(" ")
    .forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
  if (line) lines.push(line);
  return lines;
}

export async function createJoumaPng({
  date,
  lang,
  title,
  season,
  maghrib,
  rows,
  note,
}) {
  await Promise.all([
    document.fonts.load('600 60px "Cormorant Garamond"'),
    document.fonts.load('500 40px "Jost"'),
    document.fonts.load('400 26px "Jost"'),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  const dateLabel = clean(
    new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: TROIS_RIVIERES.timeZone,
    }).format(date)
  );

  ctx.fillStyle = "#faf7f0";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#0a241b";
  ctx.fillRect(0, 0, WIDTH, 340);
  ctx.fillStyle = "#b8892f";
  ctx.fillRect(0, 340, WIDTH, 6);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#d9b871";
  ctx.font = '400 26px "Jost", sans-serif';
  ctx.fillText("KHADARATOUL MALICKYA · TROIS-RIVIÈRES", WIDTH / 2, 90);

  ctx.fillStyle = "#ffffff";
  ctx.font = '600 92px "Cormorant Garamond", serif';
  ctx.fillText(clean(title), WIDTH / 2, 200);

  ctx.fillStyle = "#d9b871";
  ctx.font = '400 38px "Jost", sans-serif';
  ctx.fillText(dateLabel, WIDTH / 2, 270);

  ctx.fillStyle = "#0f3527";
  ctx.font = '500 34px "Jost", sans-serif';
  ctx.fillText(clean(`${season} · ${maghrib}`), WIDTH / 2, 410);

  ctx.textAlign = "left";
  let y = 450;
  rows.forEach((row) => {
    if (row.highlight) {
      ctx.fillStyle = "#f3e7c9";
      ctx.fillRect(70, y, WIDTH - 140, ROW_HEIGHT);
    }

    ctx.fillStyle = row.highlight ? "#b8892f" : "#0f3527";
    ctx.font = '600 62px "Cormorant Garamond", serif';
    ctx.fillText(clean(row.time), 100, y + 78);

    ctx.fillStyle = "#0a241b";
    ctx.font = '500 40px "Jost", sans-serif';
    ctx.fillText(clean(row.label), 400, y + 76);

    ctx.fillStyle = "#e1dccf";
    ctx.fillRect(70, y + ROW_HEIGHT - 2, WIDTH - 140, 2);
    y += ROW_HEIGHT;
  });
  const isoDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: TROIS_RIVIERES.timeZone,
  }).format(date);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `horaire-jouma-${isoDate}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
