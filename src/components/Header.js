"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { NAV } from "@/data/nav";
import { SITE } from "@/data/site";

export default function Header({ onOpenMenu, transparentTop = true }) {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [solid, setSolid] = useState(!transparentTop);

  useEffect(() => {
    if (!transparentTop) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentTop]);

  const isOn = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`hdr${solid ? " solid" : ""}`}>
      <div className="hdr-in">
        <Link href="/" className="brand">
          <img src={solid ? "/images/logo.png" : "/images/logo-light.png"} alt={SITE.name} />
          <span className="brand-tx">
            <span className="n">{SITE.name}</span>
            <span className="p">
              {SITE.place} · {SITE.region}
            </span>
          </span>
        </Link>

        <nav className="nav-d">
          {NAV.map((n) => (
            <Link key={n.id} href={n.href} className={isOn(n.href) ? "on" : ""}>
              {n[lang]}
            </Link>
          ))}
        </nav>

        <div className="hdr-r">
          <div className="lang">
            <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="burger" onClick={onOpenMenu} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
