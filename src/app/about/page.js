"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import QuoteCarousel from "@/components/QuoteCarousel";
import CtaBand from "@/components/CtaBand";

const HONOURS = [
  { img: "/images/portrait-tijani.jpg", name: "Sidi Ahmad At-Tidjani", role: "hon1_r", desc: "hon1_d" },
  { img: "/images/portrait-maodo.jpg", name: "Seydi El Hadji Malick Sy", role: "hon2_r", desc: "hon2_d" },
  { img: "/images/portrait-babacar.jpg", name: "Serigne Babacar Sy", role: "hon3_r", desc: "hon3_d" },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHead eyebrow={t("ab_eyebrow")} title={t("ab_title")} lead={t("ab_lead")} />

      <section className="pad-lg">
        <div className="wrap split">
          <Reveal className="split-img">
            <img src="/images/mosque-hero.jpg" alt="" />
          </Reveal>
          <div>
            <Reveal><div className="eyebrow">{t("ab_s1_t")}</div></Reveal>
            <Reveal delay={0.09}>
              <p className="lead" style={{ marginBottom: 30 }}>{t("ab_s1_p")}</p>
            </Reveal>
            <Reveal delay={0.18}><div className="eyebrow">{t("ab_s2_t")}</div></Reveal>
            <Reveal delay={0.27}><p className="lead">{t("ab_s2_p")}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="pad tint">
        <div className="wrap center">
          <Reveal><div className="eyebrow center">{t("ab_hon_eyebrow")}</div></Reveal>
          <Reveal><h2>{t("ab_hon_title")}</h2></Reveal>
        </div>
        <div className="wrap">
          <div className="honor">
            {HONOURS.map((h, i) => (
              <Reveal key={h.name} delay={i * 0.09} className="hon">
                <div className="hon-ph"><img src={h.img} alt={h.name} /></div>
                <h3>{h.name}</h3>
                <div className="role">{t(h.role)}</div>
                <p>{t(h.desc)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-lg">
        <div className="wrap wrap-narrow center">
          <Reveal>
            <div className="ornament" style={{ marginBottom: 22 }}>
              <i /><span>&#10022;</span><i />
            </div>
          </Reveal>
          <Reveal><h2 style={{ marginBottom: 18 }}>{t("ab_mis_t")}</h2></Reveal>
          <Reveal delay={0.09}>
            <p className="lead" style={{ fontSize: "1.12rem" }}>{t("ab_mis_p")}</p>
          </Reveal>
        </div>
      </section>

      <QuoteCarousel />
      <CtaBand />
    </>
  );
}
