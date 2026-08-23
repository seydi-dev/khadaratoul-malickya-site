"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PRACTICES } from "@/data/practices";
import Reveal from "./Reveal";
import PracticeStepper from "./PracticeStepper";
import CtaBand from "./CtaBand";
import Icon from "./Icon";

/**
 * Layout shared by the three practice pages (Wird, Wazifa, Khadara).
 *
 * The Khadara has a full-bleed photographic hero (the community-supplied
 * photograph, used unaltered apart from a dark overlay for legibility);
 * the other two use the standard dark page header.
 */
export default function PracticePage({ practice }) {
  const { lang, t } = useLanguage();
  const others = PRACTICES.filter((p) => p.id !== practice.id);
  const immersive = Boolean(practice.hero);

  return (
    <>
      {immersive ? (
        <header className="pr-hero">
          <div className="pr-hero-bg">
            <img src={practice.hero} alt="" />
          </div>
          <div className="wrap">
            <div className="eyebrow center">{t("pr_hub_eyebrow")}</div>
            <h1>{practice.name[lang]}</h1>
            <p>{practice.short[lang]}</p>
          </div>
        </header>
      ) : (
        <header className="page-head">
          <div className="wrap">
            <div className="eyebrow center">{t("pr_hub_eyebrow")}</div>
            <h1>{practice.name[lang]}</h1>
            <p>{practice.short[lang]}</p>
          </div>
        </header>
      )}

      {/* ---------- introduction ---------- */}
      <section className="pad">
        <div className="wrap wrap-narrow">
          <Reveal>
            <div className="pr-intro">
              <div className="pr-intro-meta">
                <span className="pr-chip">
                  <Icon name="info" />
                  {practice.obligation[lang]}
                </span>
              </div>
              <p className="lead">{practice.intro[lang]}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- guided steps ---------- */}
      <section className="pad tint">
        <div className="wrap">
          <Reveal>
            <PracticeStepper practice={practice} />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="pr-counter-note">{t("pc_counter_note")}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- full summary table ---------- */}
      <section className="pad">
        <div className="wrap wrap-narrow">
          <Reveal>
            <div className="eyebrow center">{t("pr_hub_eyebrow")}</div>
          </Reveal>
          <Reveal>
            <h2 className="center" style={{ marginBottom: 28 }}>
              {practice.name[lang]}
            </h2>
          </Reveal>

          <div className="pr-table">
            {practice.steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) * 0.05}>
                <div className="pr-trow">
                  <span className="pr-tn">{String(s.n).padStart(2, "0")}</span>
                  <span className="pr-tt">{s.title[lang]}</span>
                  <span className="pr-tc">
                    {s.count ? `${s.count} ×` : s.durationNote ? s.durationNote[lang] : "—"}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- links to the other practices ---------- */}
      <section className="pad tint">
        <div className="wrap">
          <div className="pr-others">
            {others.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.09}>
                <Link href={p.slug} className="pr-other">
                  <span className="pr-other-ico">
                    <Icon name={p.icon} />
                  </span>
                  <span className="pr-other-tx">
                    <b>{p.name[lang]}</b>
                    <i>{p.short[lang]}</i>
                  </span>
                  <Icon name="arrow" className="pr-other-arrow" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
