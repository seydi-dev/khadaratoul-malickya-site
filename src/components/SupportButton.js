"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/data/site";
import Icon from "./Icon";

export default function SupportButton({ className = "btn btn-gold" }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { recipient, phone, email } = SITE.interac;
  const copyValue = phone || email;
  const copyLabel = phone ? t("sp_copy_phone") : t("sp_copy_email");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <Icon name="heart" />
        {t("sp_btn")}
      </button>

      {open &&
        createPortal(
          <div className="sp" onClick={() => setOpen(false)}>
            <div
              className="sp-box"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="sp-x"
                aria-label={t("sp_close")}
                onClick={() => setOpen(false)}
              >
                &times;
              </button>
              <h3>{t("sp_title")}</h3>
              <p>{t("sp_lead")}</p>
              <dl>
                <div>
                  <dt>{t("sp_recipient")}</dt>
                  <dd>{recipient}</dd>
                </div>
                {phone && (
                  <div>
                    <dt>{t("sp_phone")}</dt>
                    <dd>{phone}</dd>
                  </div>
                )}
                {email && (
                  <div>
                    <dt>{t("sp_email")}</dt>
                    <dd>{email}</dd>
                  </div>
                )}
              </dl>
              <button
                type="button"
                className="btn btn-outline btn-block"
                onClick={copyContact}
              >
                {copied ? t("sp_copied") : copyLabel}
              </button>
              <p className="sp-note">{t("sp_note")}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
