"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";
import Icon from "./Icon";

/** The "Devenir un membre" band, repeated at the foot of most pages. */
export default function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="cta-band pad-lg">
      <div className="bgi">
        <img src="/images/mosque-render.jpg" alt="" />
      </div>
      <div className="wrap">
        <Reveal>
          <div className="ornament" style={{ marginBottom: 22 }}>
            <i />
            <span>&#10022;</span>
            <i />
          </div>
        </Reveal>
        <Reveal>
          <h2>{t("cta_title")}</h2>
        </Reveal>
        <Reveal delay={0.09}>
          <p>{t("cta_desc")}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            href={SITE.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            {t("cta_join")}
            <Icon name="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
