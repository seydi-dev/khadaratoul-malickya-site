"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { NAV } from "@/data/nav";
import { SITE } from "@/data/site";

export default function MenuSheet({ open, onClose }) {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isOn = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className={`sheet${open ? " open" : ""}`}>
      <div className="sheet-top">
        <img src="/images/logo-light.png" alt={SITE.name} />
        <button className="sheet-x" onClick={onClose} aria-label="Fermer">&times;</button>
      </div>

      <nav>
        {NAV.map((n, i) => (
          <Link
            key={n.id}
            href={n.href}
            onClick={onClose}
            className={isOn(n.href) ? "on" : ""}
            style={{ transitionDelay: open ? `${0.05 + i * 0.045}s` : "0s" }}
          >
            <i>0{i + 1}</i>
            {n[lang]}
          </Link>
        ))}
      </nav>

      <div className="sheet-cta">
        <a href={SITE.formUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-block">
          {t("cta_join")}
        </a>
      </div>
    </div>
  );
}
