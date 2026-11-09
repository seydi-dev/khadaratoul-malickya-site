"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "./Icon";

export default function Lightbox({ src, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = src ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  const file = src ? decodeURIComponent(src.split("/").pop()) : "";

  return (
    <div className={`lb${src ? " open" : ""}`} onClick={onClose}>
      <button className="lb-x" aria-label="Fermer">&times;</button>
      {src && (
        <a
          className="lb-dl"
          href={src}
          download={file}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon name="download" />
          {t("gl_download")}
        </a>
      )}
      {src && <img src={src} alt="" />}
    </div>
  );
}
