"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PRACTICES } from "@/data/practices";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export default function PracticesPage() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHead
        eyebrow={t("pr_hub_eyebrow")}
        title={t("pr_hub_title")}
        lead={t("pr_hub_lead")}
      />

      <section className="pad-lg">
        <div className="wrap">
          <div className="pr-hub">
            {PRACTICES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.09}>
                <Link href={p.slug} className="pr-card">
                  <div className="pr-card-img">
                    <img src={p.cover} alt="" />
                    <span className="pr-card-ico">
                      <Icon name={p.icon} />
                    </span>
                  </div>
                  <div className="pr-card-b">
                    <span className="pr-card-tag">{p.obligation[lang]}</span>
                    <h3>{p.name[lang]}</h3>
                    <p>{p.short[lang]}</p>
                    <span className="pr-card-link">
                      {t("pr_discover")} <Icon name="arrow" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={PRACTICES.length * 0.09}>
              <Link href="/practices/chartes" className="pr-card">
                <div className="pr-card-img">
                  <img src="/images/rawda-cheikh.jpeg" alt="" />
                  <span className="pr-card-ico">
                    <Icon name="book" />
                  </span>
                </div>
                <div className="pr-card-b">
                  <span className="pr-card-tag">{t("ch_tag")}</span>
                  <h3>{t("ch_card_title")}</h3>
                  <p>{t("ch_card_short")}</p>
                  <span className="pr-card-link">
                    {t("pr_discover")} <Icon name="arrow" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="pr-source">
              <Icon name="info" className="pr-source-ico" />
              <div>
                <strong>{t("pr_source_title")}</strong>
                <p>{t("pr_source_note")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
