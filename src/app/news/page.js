"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

const ARTICLES = [
  { img: "/images/poster-maouloud.jpg", tag: "n1_tag", title: "n1_t", desc: "n1_d", href: "/program" },
  { img: "/images/banner-gamou.jpg", tag: "n2_tag", title: "n2_t", desc: "n2_d", href: "/program" },
  { img: "/images/gallery-2.jpg", tag: "n3_tag", title: "n3_t", desc: "n3_d", href: "/gallery" },
];

export default function NewsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHead eyebrow={t("nw_eyebrow")} title={t("nw_title")} lead={t("nw_lead")} />

      <section className="pad-lg">
        <div className="wrap">
          <div className="news">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.09}>
                <Link href={a.href} className="na" style={{ display: "flex", height: "100%" }}>
                  <div className="na-img"><img src={a.img} alt="" /></div>
                  <div className="na-b">
                    <span className="na-tag">{t(a.tag)}</span>
                    <h3>{t(a.title)}</h3>
                    <p>{t(a.desc)}</p>
                  </div>
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
