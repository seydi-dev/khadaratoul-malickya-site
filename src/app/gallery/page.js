"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";
import CtaBand from "@/components/CtaBand";

const PHOTOS = Array.from({ length: 9 }, (_, i) => `/images/gallery-${i + 1}.jpg`);

export default function GalleryPage() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(null);

  return (
    <>
      <PageHead eyebrow={t("gl_eyebrow")} title={t("gl_title")} lead={t("gl_lead")} />

      <section className="pad-lg">
        <div className="wrap">
          <div className="gal">
            {PHOTOS.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.07}>
                <button
                  className={`gal-i${i === 0 || i === 5 ? " big" : ""}`}
                  onClick={() => setOpen(src)}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img src={src} alt="Khadaratoul Malickya" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox src={open} onClose={() => setOpen(null)} />
      <CtaBand />
    </>
  );
}
