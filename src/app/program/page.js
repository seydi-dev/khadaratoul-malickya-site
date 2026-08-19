"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/data/site";
import { EVENTS } from "@/data/events";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/EventCard";
import JoumaProgram from "@/components/JoumaProgram";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export default function ProgramPage() {
  const { t } = useLanguage();

  const sessions = [
    { day: "day_fri", title: "kh_t", desc: "kh_d" },
    { day: "day_sun", title: "wa_t", desc: "wa_d" },
  ];

  return (
    <>
      <PageHead eyebrow={t("pr_eyebrow")} title={t("pr_title")} lead={t("pr_lead")} />

      {/* ---------- automatic Jouma programme ---------- */}
      <section className="pad-lg">
        <div className="wrap wrap-narrow">
          <div className="center">
            <Reveal><div className="eyebrow center">{t("jo_eyebrow")}</div></Reveal>
            <Reveal><h2>{t("jo_title")}</h2></Reveal>
            <Reveal delay={0.09}>
              <p className="lead" style={{ marginTop: 12, marginBottom: 40 }}>{t("jo_lead")}</p>
            </Reveal>
          </div>
          <Reveal delay={0.18}><JoumaProgram /></Reveal>
        </div>
      </section>

      {/* ---------- weekly sessions ---------- */}
      <section className="pad tint">
        <div className="wrap">
          <Reveal><div className="eyebrow">{t("pr_week_e")}</div></Reveal>
          <Reveal><h2>{t("pr_week_t")}</h2></Reveal>
          <div className="sch">
            {sessions.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.09} className="sch-item">
                <div className="sch-day">
                  <Icon name="calendar" />
                  {t(s.day)}
                </div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.desc)}</p>
                <div className="sch-loc">
                  <Icon name="pin" />
                  <span>
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- special events ---------- */}
      <section className="dark pad-lg">
        <div className="wrap">
          <div className="center">
            <Reveal><div className="eyebrow center">{t("pr_sp_e")}</div></Reveal>
            <Reveal><h2>{t("pr_sp_t")}</h2></Reveal>
          </div>
          <div className="evt-grid">
            {EVENTS.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.09}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
