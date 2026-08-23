"use client";

/** Line icons used across the site. Stroke inherits currentColor. */
const PATHS = {
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 5-6 8-6s7 2 8 6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
  news: (
    <>
      <path d="M4 5h13v14H4z" />
      <path d="M17 9h3v8a2 2 0 0 1-3 1.7" />
      <path d="M7 9h7M7 12h7M7 15h4" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M21 17l-6-6-4 4-3-3-5 5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 6l9 7 9-7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M4.2 6.5l15.6 9M19.8 6.5l-15.6 9" />
      <path d="M12 6l-2-2 2-2 2 2-2 2M12 22l-2-2 2-2 2 2-2 2" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z" />
    </>
  ),
  book: (
    <>
      <path d="M4 4h9a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" />
      <path d="M20 4h-9v14a3 3 0 0 1 3-3h6z" />
    </>
  ),
  hands: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3 20c.8-3.4 3.4-5 6-5s5.2 1.6 6 5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="14" r="4" />
      <path d="M11 12l8-8 2 2-2 2 2 2-2 2-2-2-2 2" />
    </>
  ),
  case: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    </>
  ),
  house: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  box: (
    <>
      <path d="M3 8l9-4 9 4v8l-9 4-9-4z" />
      <path d="M3 8l9 4 9-4M12 12v8" />
    </>
  ),
  chat: (
    <>
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4" />
    </>
  ),
  beads: (
    <>
      <circle cx="12" cy="4.6" r="1.7" />
      <circle cx="17" cy="6.8" r="1.7" />
      <circle cx="19.4" cy="11.5" r="1.7" />
      <circle cx="17" cy="16.2" r="1.7" />
      <circle cx="12" cy="18.4" r="1.7" />
      <circle cx="7" cy="16.2" r="1.7" />
      <circle cx="4.6" cy="11.5" r="1.7" />
      <circle cx="7" cy="6.8" r="1.7" />
    </>
  ),
  mosque: (
    <>
      <path d="M12 2.5c2.2 1.8 3.4 3.6 3.4 5.3H8.6c0-1.7 1.2-3.5 3.4-5.3Z" />
      <path d="M4 21V11.5a2.6 2.6 0 0 1 2.6-2.6h10.8A2.6 2.6 0 0 1 20 11.5V21" />
      <path d="M2.5 21h19" />
      <path d="M10 21v-3.6a2 2 0 0 1 4 0V21" />
    </>
  ),
  praying: (
    <>
      <path d="M12 3.2c1.4 2 2.1 3.7 2.1 5.2 0 1.6-.9 2.6-2.1 3.4-1.2-.8-2.1-1.8-2.1-3.4 0-1.5.7-3.2 2.1-5.2Z" />
      <path d="M6.5 20.5c.6-3.4 2.7-5.3 5.5-5.3s4.9 1.9 5.5 5.3" />
      <path d="M4.5 12.5 6 15M19.5 12.5 18 15" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4" />
    </>
  ),
  beads: (
    <>
      <circle cx="12" cy="4.6" r="1.7" />
      <circle cx="17" cy="6.8" r="1.7" />
      <circle cx="19.4" cy="11.5" r="1.7" />
      <circle cx="17" cy="16.2" r="1.7" />
      <circle cx="12" cy="18.4" r="1.7" />
      <circle cx="7" cy="16.2" r="1.7" />
      <circle cx="4.6" cy="11.5" r="1.7" />
      <circle cx="7" cy="6.8" r="1.7" />
    </>
  ),
  mosque: (
    <>
      <path d="M12 2.5c2.2 1.8 3.4 3.6 3.4 5.3H8.6c0-1.7 1.2-3.5 3.4-5.3Z" />
      <path d="M4 21V11.5a2.6 2.6 0 0 1 2.6-2.6h10.8A2.6 2.6 0 0 1 20 11.5V21" />
      <path d="M2.5 21h19" />
      <path d="M10 21v-3.6a2 2 0 0 1 4 0V21" />
    </>
  ),
  praying: (
    <>
      <path d="M12 3.2c1.4 2 2.1 3.7 2.1 5.2 0 1.6-.9 2.6-2.1 3.4-1.2-.8-2.1-1.8-2.1-3.4 0-1.5.7-3.2 2.1-5.2Z" />
      <path d="M6.5 20.5c.6-3.4 2.7-5.3 5.5-5.3s4.9 1.9 5.5 5.3" />
      <path d="M4.5 12.5 6 15M19.5 12.5 18 15" />
    </>
  ),
};

export default function Icon({ name, className = "" }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
