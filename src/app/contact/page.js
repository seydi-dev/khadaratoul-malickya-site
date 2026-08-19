"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/data/site";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHead eyebrow={t("ct_eyebrow")} title={t("ct_title")} lead={t("ct_lead")} />

      <section className="pad-lg">
        <div className="wrap">
          <div className="ct">
            {/* meeting place */}
            <Reveal className="ct-card">
              <div className="sm">{t("ct_loc_sm")}</div>
              <h3>{t("ct_loc_t")}</h3>
              <div style={{ margin: "22px 0 10px" }}>
                <div className="addr">{SITE.address.street}</div>
                <div className="addr-sub">{SITE.address.city}</div>
              </div>
              <p className="ct-note">{t("ct_loc_p")}</p>
            </Reveal>

            {/* WhatsApp — the only channel we have for now */}
            <Reveal delay={0.09} className="ct-card ct-wa">
              <div className="sm">{t("ct_wa_sm")}</div>
              <h3>{t("ct_wa_t")}</h3>
              <img src="/images/qr-whatsapp.png" alt="Code QR — groupe WhatsApp" />
              <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.75 }}>
                {t("ct_wa_p")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
