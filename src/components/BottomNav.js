"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { NAV, BOTTOM_NAV } from "@/data/nav";
import Icon from "./Icon";

export default function BottomNav() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const items = BOTTOM_NAV.map((id) => NAV.find((n) => n.id === id));

  return (
    <nav className="bnav">
      {items.map((n) => {
        const on = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
        return (
          <Link key={n.id} href={n.href} className={on ? "on" : ""}>
            <Icon name={n.icon} />
            <span>{n[lang]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
