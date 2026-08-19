"use client";

import { useEffect } from "react";

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = src ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  return (
    <div className={`lb${src ? " open" : ""}`} onClick={onClose}>
      <button className="lb-x" aria-label="Fermer">&times;</button>
      {src && <img src={src} alt="" />}
    </div>
  );
}
