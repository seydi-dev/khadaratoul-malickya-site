"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LIBRARY } from "@/data/library";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import LibraryCard from "@/components/LibraryCard";
import CtaBand from "@/components/CtaBand";

export default function LibraryPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHead eyebrow={t("lb_eyebrow")} title={t("lb_title")} lead={t("lb_lead")} />

      <section className="pad-lg">
        <div className="wrap">
          <div className="lib-grid">
            {LIBRARY.map((doc, i) => (
              <Reveal key={doc.id} delay={i * 0.09}>
                <LibraryCard doc={doc} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="pr-source" style={{ marginTop: 40 }}>
              <span className="pr-source-ico" aria-hidden="true">📖</span>
              <div>
                <strong>{t("lb_note_title")}</strong>
                <p>{t("lb_note")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
