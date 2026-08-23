"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Visual aid for counting recitations. It is deliberately NOT a validation
 * tool: it does not check or certify any religious practice, it simply helps
 * the user keep track while reciting.
 */
export default function DhikrCounter({ target, label }) {
  const { t } = useLanguage();
  const [n, setN] = useState(0);

  const pct = target ? Math.min(100, (n / target) * 100) : 0;
  const done = target && n >= target;

  return (
    <div className={`dcount${done ? " done" : ""}`}>
      <div className="dcount-top">
        <span className="dcount-label">{label}</span>
        <span className="dcount-val">
          <b>{n}</b>
          <i>/ {target}</i>
        </span>
      </div>

      <div className="dcount-bar">
        <span style={{ width: `${pct}%` }} />
      </div>

      <div className="dcount-actions">
        <button
          className="dcount-btn"
          onClick={() => setN((v) => Math.max(0, v - 1))}
          aria-label={t("pc_minus")}
        >
          −
        </button>

        <button className="dcount-recite" onClick={() => setN((v) => v + 1)}>
          {done ? t("pc_done") : t("pc_recite")}
        </button>

        <button
          className="dcount-btn"
          onClick={() => setN((v) => v + 1)}
          aria-label={t("pc_plus")}
        >
          +
        </button>
      </div>

      <button className="dcount-reset" onClick={() => setN(0)}>
        {t("pc_reset")}
      </button>
    </div>
  );
}
