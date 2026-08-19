"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/data/site";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

const BENEFITS = [
  { ic: "hands", k: "b1" },
  { ic: "key", k: "b2" },
  { ic: "book", k: "b3" },
  { ic: "case", k: "b4" },
  { ic: "house", k: "b5" },
  { ic: "heart", k: "b6" },
];

const FEES = ["f1", "f2", "f3", "f4"];

export default function MembershipPage() {
  const { t } = useLanguage();
  const [fee, setFee] = useState(1); // monthly pre-selected

  return (
    <>
      <PageHead eyebrow={t("mb_eyebrow")} title={t("mb_title")} lead={t("mb_lead")} />

      {/* ---------- how to join ---------- */}
      <section className="pad-lg">
        <div className="wrap">
          <div className="join">
            <Reveal className="join-main">
              <h3>{t("mb_join_t")}</h3>
              <p>{t("mb_join_p")}</p>
              <a
                href={SITE.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ alignSelf: "flex-start" }}
              >
                {t("cta_join")}
                <Icon name="arrow" />
              </a>
            </Reveal>

            <Reveal delay={0.09} className="qr-card">
              <h4>{t("mb_qr_t")}</h4>
              <img src="/images/qr-form.png" alt="Code QR — formulaire d'adhésion" />
              <p>{t("mb_qr_p")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- benefits ---------- */}
      <section className="pad tint">
        <div className="wrap center">
          <Reveal><div className="eyebrow center">{t("mb_ben_e")}</div></Reveal>
          <Reveal><h2>{t("mb_ben_t")}</h2></Reveal>
        </div>
        <div className="wrap">
          <div className="cards c3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.k} delay={(i % 3) * 0.09} className="card">
                <div className="card-ico"><Icon name={b.ic} /></div>
                <h3>{t(`${b.k}_t`)}</h3>
                <p>{t(`${b.k}_d`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- fees ---------- */}
      <section className="pad-lg">
        <div className="wrap center">
          <Reveal><div className="eyebrow center">{t("mb_fee_e")}</div></Reveal>
          <Reveal><h2>{t("mb_fee_t")}</h2></Reveal>
          <Reveal delay={0.09}>
            <p className="lead" style={{ marginTop: 12 }}>{t("mb_fee_p")}</p>
          </Reveal>
        </div>
        <div className="wrap">
          <div className="fees">
            {FEES.map((k, i) => (
              <Reveal key={k} delay={i * 0.06}>
                <div
                  className={`fee${fee === i ? " on" : ""}`}
                  onClick={() => setFee(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFee(i)}
                >
                  <b>{t(k)}</b>
                  <span>{t(`${k}n`)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
