"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CELLS } from "@/data/cells";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export default function StructurePage() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHead eyebrow={t("st_eyebrow")} title={t("st_title")} lead={t("st_lead")} />

      <section className="pad-lg">
        <div className="wrap">
          <div className="cards c3">
            {CELLS.map((c, i) => (
              <Reveal key={c.en} delay={(i % 3) * 0.09} className="card">
                <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="card-ico"><Icon name={c.icon} /></div>
                <h3>{lang === "fr" ? c.fr : c.en}</h3>
                <p>{lang === "fr" ? c.dfr : c.den}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
