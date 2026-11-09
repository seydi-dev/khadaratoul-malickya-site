"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageHead from "@/components/PageHead";
import MediaTabs from "@/components/MediaTabs";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

function formatDate(date, lang) {
  if (!date) return "";
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GalleryContent({ albums }) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");

  const shown = filter === "all" ? albums : albums.filter((a) => a.id === filter);

  return (
    <>
      <PageHead
        eyebrow={t("gl_eyebrow")}
        title={t("gl_title")}
        lead={t("gl_lead")}
      />
      <MediaTabs />

      <section className="pad-lg">
        <div className="wrap">
          {albums.length > 1 && (
            <div className="au-filters">
              <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>
                {t("gl_all")}
              </button>
              {albums.map((a) => (
                <button
                  key={a.id}
                  className={filter === a.id ? "on" : ""}
                  onClick={() => setFilter(a.id)}
                >
                  {a.title[lang]}
                </button>
              ))}
            </div>
          )}

          {shown.map((album) => {
            const count = album.photos.length;
            const meta = [formatDate(album.date, lang), `${count} photo${count > 1 ? "s" : ""}`]
              .filter(Boolean)
              .join(" · ");

            return (
              <div className="gal-album" key={album.id}>
                <div className="gal-head">
                  <h2>{album.title[lang]}</h2>
                  <p>{meta}</p>
                </div>

                <div className="gal">
                  {album.photos.map((photo, i) => (
                    <Reveal key={photo.src} delay={(i % 3) * 0.07}>
                      <div className="gal-w">
                        <button
                          className="gal-i"
                          onClick={() => setOpen(photo.src)}
                          aria-label={`${album.title[lang]} — photo ${i + 1}`}
                        >
                          <img src={photo.src} alt={album.title[lang]} />
                        </button>
                        <a
                          className="gal-dl"
                          href={photo.src}
                          download={photo.file}
                          aria-label={`${t("gl_download")} — photo ${i + 1}`}
                          title={t("gl_download")}
                        >
                          <Icon name="download" />
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Lightbox src={open} onClose={() => setOpen(null)} />
      <CtaBand />
    </>
  );
}
