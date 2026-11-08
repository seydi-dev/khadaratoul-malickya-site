"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "./Icon";

const TABS = [
  { href: "/audios", key: "md_audios", icon: "volume" },
  { href: "/library", key: "md_documents", icon: "book" },
  { href: "/gallery", key: "md_photos", icon: "image" },
];

/** Links between the three pages of the media library. */
export default function MediaTabs() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className="md-tabs" aria-label={t("md_label")}>
      <div className="md-tabs-in">
        {TABS.map((tab) => (
          <Link key={tab.href} href={tab.href} className={pathname.startsWith(tab.href) ? "on" : ""}>
            <Icon name={tab.icon} />
            {t(tab.key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
