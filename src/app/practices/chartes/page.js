"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PRACTICES } from "@/data/practices";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import ChartesList from "@/components/ChartesList";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export default function ChartesPage() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHead
        eyebrow={t("pr_hub_eyebrow")}
        title={t("ch_title")}
        lead={t("ch_lead")}
      />

      <section className="pad">
        <div className="wrap wrap-narrow">
          <Reveal>
            <div className="pr-intro">
              <div className="pr-intro-meta">
                <span className="pr-chip">
                  <Icon name="info" />
                  {t("ch_count")}
                </span>
              </div>
              <p className="lead">{t("ch_intro")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad tint">
        <div className="wrap wrap-narrow">
          <Reveal>
            <ChartesList />
          </Reveal>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="pr-others">
            {PRACTICES.map((p, i) => (
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
