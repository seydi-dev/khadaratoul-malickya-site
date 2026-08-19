"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { buildJoumaProgram, STEP_LABELS } from "@/lib/jouma";
import { formatTime, nextFriday, TROIS_RIVIERES } from "@/lib/prayer";
import Icon from "./Icon";

/** Short description shown on the right of each row. */
const DETAIL_KEYS = {
  summer: {
    wasifa: "d_wasifa",
    khadara: "d_khadara",
    maghrib: "d_maghrib",
    taissir: "d_taissir",
    motfin: "d_motfin",
    souper: "d_souper",
  },
  winter: {
    khadara: "d_khadara",
    maghrib: "d_maghrib",
    wasifa: "d_wasifa_w",
    taissir: "d_taissir_w",
    motfin: "d_motfin",
    souper: "d_souper",
  },
};

export default function JoumaProgram() {
  const { lang, t } = useLanguage();
  const [program, setProgram] = useState(null);
  const [date, setDate] = useState(null);

  // Computed on the client so the visitor always sees the current week,
  // and so the build output is never frozen to a stale date.
  useEffect(() => {
    const friday = nextFriday(new Date());
    setDate(friday);
    setProgram(buildJoumaProgram(friday));
  }, []);

  if (!program || !date) {
    return (
      <div className="jouma">
        <div className="jouma-head">
          <h3>{t("jo_card_title")}</h3>
          <div className="sub">{TROIS_RIVIERES.label}</div>
        </div>
        <div className="jouma-body">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div className="jrow" key={i}>
              <span className="jt">--:--</span>
              <span className="jl" style={{ opacity: 0.4 }}>
                &nbsp;
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const details = DETAIL_KEYS[program.season];
  const dateLabel = new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TROIS_RIVIERES.timeZone,
  }).format(date);

  return (
    <div className="jouma">
      <div className="jouma-head">
        <h3>{t("jo_card_title")}</h3>
        <div className="sub">
          {t("jo_for")} {dateLabel} · {TROIS_RIVIERES.label}
        </div>
        <div className="jouma-badges">
          <span className="badge solid">
            <Icon name={program.season === "summer" ? "sun" : "snow"} />
            {program.season === "summer" ? t("jo_summer") : t("jo_winter")}
          </span>
          <span className="badge">
            <Icon name="clock" />
            {t("jo_maghrib")} {formatTime(program.maghrib, lang)}
          </span>
        </div>
      </div>

      <div className="jouma-body">
        {program.steps.map((step) => (
          <div className={`jrow${step.highlight ? " hl" : ""}`} key={step.key}>
            <span className="jt">{formatTime(step.at, lang)}</span>
            <span className="jl">{STEP_LABELS[step.key][lang]}</span>
          </div>
        ))}
      </div>

      <div className="jouma-foot">{t("jo_note")}</div>
    </div>
  );
}
