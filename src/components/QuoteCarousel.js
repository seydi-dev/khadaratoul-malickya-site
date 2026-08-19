"use client";

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { QUOTES } from "@/data/quotes";
import Reveal from "./Reveal";

export default function QuoteCarousel() {
  const { lang, t } = useLanguage();
  const [i, setI] = useState(0);

  const next = useCallback(() => setI((v) => (v + 1) % QUOTES.length), []);

  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next, i]);

  return (
    <section className="quotes pad-lg">
      <div className="wrap wrap-narrow center">
        <Reveal><div className="eyebrow center">{t("q_eyebrow")}</div></Reveal>
        <Reveal><div className="q-mark">&ldquo;</div></Reveal>

        <div className="q-track">
          {QUOTES.map((q, idx) => (
            <div key={idx} className={`q-slide${idx === i ? " on" : ""}`}>
              <p className="q-ar">{q.transliteration}</p>
              <p className="q-tr">{q[lang]}</p>
            </div>
          ))}
        </div>

        <div className="q-dots">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              className={idx === i ? "on" : ""}
              onClick={() => setI(idx)}
              aria-label={`Citation ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
