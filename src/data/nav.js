/** Site navigation. `href` drives the Next.js routes. */
export const NAV = [
  { id: "home", href: "/", fr: "Accueil", en: "Home", icon: "home" },
  { id: "about", href: "/about", fr: "À propos", en: "About", icon: "info" },
  {
    id: "program",
    href: "/program",
    fr: "Programme",
    en: "Program",
    icon: "calendar",
  },
  {
    id: "practices",
    href: "/practices",
    fr: "Pratiques",
    en: "Practices",
    icon: "beads",
  },
  {
    id: "media",
    href: "/audios",
    match: ["/audios", "/library", "/gallery"],
    fr: "Médiathèque",
    en: "Media",
    icon: "volume",
  },
  {
    id: "membership",
    href: "/membership",
    fr: "Adhésion",
    en: "Membership",
    icon: "user",
  },
  { id: "news", href: "/news", fr: "Actualités", en: "News", icon: "news" },
  {
    id: "contact",
    href: "/contact",
    fr: "Contact",
    en: "Contact",
    icon: "mail",
  },
];

/** True when the current page belongs to this menu item. */
export function isActive(item, pathname) {
  const paths = item.match || [item.href];
  return paths.some((href) => (href === "/" ? pathname === "/" : pathname.startsWith(href)));
}

/** The four shown in the mobile bottom bar. */
export const BOTTOM_NAV = ["home", "program", "membership", "contact"];
