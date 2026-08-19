"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const pad = (n) => (n < 10 ? "0" + n : String(n));

/**
 * Live countdown to a fixed date.
 * <CountdownClock target="2026-09-05T20:30:00" />
 */
export default function CountdownClock({ target }) {
  const { t } = useLanguage();
  const [p, setP] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      let diff = new Date(target) - new Date();
      if (diff < 0) diff = 0;
      setP({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { v: p.d, l: t("cd_days") },
    { v: p.h, l: t("cd_hours") },
    { v: p.m, l: t("cd_min") },
    { v: p.s, l: t("cd_sec") },
  ];

  return (
    <div className="cd">
      {units.map((u, i) => (
        <div className="cd-u" key={i}>
          <b>{pad(u.v)}</b>
          <span>{u.l}</span>
        </div>
      ))}
    </div>
  );
}
