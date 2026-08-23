"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/data/site";
import { EVENTS } from "@/data/events";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/EventCard";
import QuoteCarousel from "@/components/QuoteCarousel";
import CtaBand from "@/components/CtaBand";
import JoumaProgram from "@/components/JoumaProgram";
import Icon from "@/components/Icon";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/images/mosque-render.jpg" alt="" />
        </div>
        <div className="hero-pat" />
        <div className="hero-in">
          <img
            className="hero-logo"
            src="/images/logo-light.png"
            alt={SITE.name}
          />
          <h1>{SITE.name}</h1>
          <p className="sub">{t("hero_sub")}</p>
          <p className="desc">{t("hero_desc")}</p>
          <div className="hero-btns">
            <a
              href={SITE.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              {t("cta_join")}
              <Icon name="arrow" />
            </a>
            <Link href="/program" className="btn btn-ghost">
              {t("cta_program")}
            </Link>
          </div>
        </div>
        <div className="scroll-cue">
          <span>{t("scroll")}</span>
          <i />
        </div>
      </section>

      {/* ---------- UPCOMING EVENTS ---------- */}
      <section className="dark pad-lg">
        <div className="wrap">
          <div className="center">
            <Reveal>
              <div className="eyebrow center">{t("ev_eyebrow")}</div>
            </Reveal>
            <Reveal>
              <h2>{t("ev_title")}</h2>
            </Reveal>
          </div>
          <div className="evt-grid">
            {EVENTS.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.09}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: 38 }}>
            <Reveal>
              <Link href="/program" className="btn btn-ghost">
                {t("ev_all")}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="pad-lg">
        <div className="wrap split">
          <Reveal className="split-img">
            <img src="/images/intro.jpg" alt="Seydi El Hadji Malick Sy" />
          </Reveal>
          <div>
            <Reveal>
              <div className="eyebrow">{t("int_eyebrow")}</div>
            </Reveal>
            <Reveal>
              <h2 style={{ marginBottom: 20 }}>{t("int_title")}</h2>
            </Reveal>
            <Reveal delay={0.09}>
              <p className="lead" style={{ marginBottom: 16 }}>
                {t("int_p1")}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="lead" style={{ marginBottom: 28 }}>
                {t("int_p2")}
              </p>
            </Reveal>
            <Reveal delay={0.27}>
              <Link href="/about" className="btn btn-outline">
                {t("int_more")}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- JOUMA PROGRAMME ---------- */}
      <section className="pad tint">
        <div className="wrap wrap-narrow">
          <div className="center">
            <Reveal>
              <div className="eyebrow center">{t("jo_eyebrow")}</div>
            </Reveal>
            <Reveal>
              <h2>{t("jo_title")}</h2>
            </Reveal>
            <Reveal delay={0.09}>
              <p className="lead" style={{ marginTop: 12, marginBottom: 40 }}>
                {t("jo_lead")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <JoumaProgram />
          </Reveal>
        </div>
      </section>

      {/* ---------- WHAT WE OFFER ---------- */}
      <section className="pad">
        <div className="wrap center">
          <Reveal>
            <div className="eyebrow center">{t("off_eyebrow")}</div>
          </Reveal>
          <Reveal>
            <h2>{t("off_title")}</h2>
          </Reveal>
        </div>
        <div className="wrap">
          <div className="cards c3">
            {[
              { ic: "book", t: "off1_t", d: "off1_d" },
              { ic: "hands", t: "off2_t", d: "off2_d" },
              { ic: "heart", t: "off3_t", d: "off3_d" },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.09} className="card">
                <div className="card-ico">
                  <Icon name={c.ic} />
                </div>
                <h3>{t(c.t)}</h3>
                <p>{t(c.d)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteCarousel />
      <CtaBand />
    </>
  );
}
