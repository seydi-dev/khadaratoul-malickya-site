/** Site navigation. `href` drives the Next.js routes. */
export const NAV = [
  { id: "home",       href: "/",           fr: "Accueil",    en: "Home",       icon: "home" },
  { id: "about",      href: "/about",      fr: "À propos",   en: "About",      icon: "info" },
  { id: "program",    href: "/program",    fr: "Programme",  en: "Program",    icon: "calendar" },
  { id: "membership", href: "/membership", fr: "Adhésion",   en: "Membership", icon: "user" },
  { id: "structure",  href: "/structure",  fr: "Structure",  en: "Structure",  icon: "grid" },
  { id: "news",       href: "/news",       fr: "Actualités", en: "News",       icon: "news" },
  { id: "gallery",    href: "/gallery",    fr: "Galerie",    en: "Gallery",    icon: "image" },
  { id: "contact",    href: "/contact",    fr: "Contact",    en: "Contact",    icon: "mail" },
];

/** The four shown in the mobile bottom bar. */
export const BOTTOM_NAV = ["home", "program", "membership", "contact"];
