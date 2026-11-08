"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAudio } from "@/context/AudioContext";
import { AUDIO_CATEGORIES } from "@/data/audios";
import PageHead from "@/components/PageHead";
import MediaTabs from "@/components/MediaTabs";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import Waveform from "@/components/Waveform";
import { formatTime } from "@/components/AudioPlayer";

function formatSize(bytes) {
  return `${Math.round(bytes / (1024 * 1024))} Mo`;
}

function formatDate(date, lang) {
  if (!date) return "";
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AudiosContent({ audios }) {
  const { lang, t } = useLanguage();
  const { track, playing, current, duration, play, seek } = useAudio();
  const [filter, setFilter] = useState("all");
  const [targetId, setTargetId] = useState("");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !audios.some((a) => a.id === id)) return;
    setTargetId(id);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }, [audios]);

  const share = async (a) => {
    const url = `${window.location.origin}/audios#${a.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: a.title, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(a.id);
      setTimeout(() => setCopiedId(""), 2000);
    } catch {}
  };

  const categories = AUDIO_CATEGORIES.filter((c) => audios.some((a) => a.category === c.id));
  const shown = filter === "all" ? audios : audios.filter((a) => a.category === filter);
  const categoryLabel = (id) => AUDIO_CATEGORIES.find((c) => c.id === id)?.[lang] || "";

  return (
    <>
      <PageHead eyebrow={t("au_eyebrow")} title={t("au_title")} lead={t("au_lead")} />
      <MediaTabs />

      <section className="pad">
        <div className="wrap wrap-narrow">
          {categories.length > 1 && (
            <div className="au-filters">
              <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>
                {t("au_all")}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={filter === c.id ? "on" : ""}
                  onClick={() => setFilter(c.id)}
                >
                  {c[lang]}
                </button>
              ))}
            </div>
          )}

          {shown.length === 0 ? (
            <p className="au-empty">{t("au_empty")}</p>
          ) : (
            <ul className="au-list">
              {shown.map((a, i) => {
                const active = track?.src === a.src;
                const progress = active && duration ? current / duration : 0;
                const meta = [
                  formatDate(a.date, lang),
                  categoryLabel(a.category),
                  a.duration ? formatTime(a.duration) : "",
                  formatSize(a.size),
                ]
                  .filter(Boolean)
                  .join(" · ");

                return (
                  <Reveal
                    as="li"
                    key={a.src}
                    delay={(i % 4) * 0.07}
                    className={`au-item${active ? " on" : ""}${targetId === a.id ? " target" : ""}`}
                  >
                    <div id={a.id} className="au-top">
                      <span className="au-num">{String(i + 1).padStart(2, "0")}</span>

                      <div className="au-info">
                        <h3>{a.title}</h3>
                        <p>{meta}</p>
                      </div>

                      <div className="au-actions">
                        <button className="btn btn-gold au-btn" onClick={() => play(a)}>
                          <Icon name={active && playing ? "pause" : "play"} />
                          {active && playing ? t("au_pause") : t("au_listen")}
                        </button>
                        <a
                          href={a.src}
                          download={a.file}
                          className="btn btn-outline au-btn"
                          aria-label={`${t("au_download")} — ${a.title}`}
                        >
                          <Icon name="download" />
                          <span className="au-label">{t("au_download")}</span>
                        </a>
                        <button
                          className="btn btn-outline au-btn"
                          onClick={() => share(a)}
                          aria-label={`${t("au_share")} — ${a.title}`}
                          title={t("au_share")}
                        >
                          <Icon name="share" />
                          {copiedId === a.id && <span>{t("au_copied")}</span>}
                        </button>
                      </div>
                    </div>

                    {a.peaks && (
                      <Waveform
                        className="au-wave"
                        peaks={a.peaks}
                        bars={110}
                        progress={progress}
                        onSeek={(ratio) =>
                          active && duration ? seek(ratio * duration) : play(a, ratio)
                        }
                        label={`${t("au_progress")} — ${a.title}`}
                      />
                    )}
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
