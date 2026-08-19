"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { NAV } from "@/data/nav";
import { SITE } from "@/data/site";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="ft">
      <div className="wrap">
        <img src="/images/logo-light.png" alt={SITE.name} />
        <div className="ft-nav">
          {NAV.map((n) => (
            <Link key={n.id} href={n.href}>
              {n[lang]}
            </Link>
          ))}
        </div>
        <div className="ft-b">
          <div>{t("ft_line")}</div>
          <div style={{ opacity: 0.65, marginTop: 4 }}>
            {SITE.address.street}, {SITE.address.city}
          </div>
        </div>
      </div>
    </footer>
  );
}
