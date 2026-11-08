"use client";

import { useEffect } from "react";
import { useAudio } from "@/context/AudioContext";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "./Icon";
import Waveform from "./Waveform";

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/** Bar fixed at the bottom of the screen while an audio is loaded. */
export default function AudioPlayer() {
  const { track, playing, current, duration, volume, toggle, seek, setVolume, stop } = useAudio();
  const { t } = useLanguage();

  useEffect(() => {
    document.body.classList.toggle("has-player", !!track);
  }, [track]);

  if (!track) return null;

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="ap" role="region" aria-label={t("au_player")}>
      <div className="ap-in">
        <button
          className="ap-play"
          onClick={toggle}
          aria-label={playing ? t("au_pause") : t("au_play")}
        >
          <Icon name={playing ? "pause" : "play"} />
        </button>

        <div className="ap-main">
          <div className="ap-title" title={track.title}>
            {track.title}
          </div>
          {track.peaks ? (
            <Waveform
              className="ap-wave"
              peaks={track.peaks}
              bars={140}
              progress={progress / 100}
              onSeek={(ratio) => duration && seek(ratio * duration)}
              label={t("au_progress")}
            />
          ) : (
            <input
              type="range"
              className="ap-bar"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(current, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              style={{ "--p": `${progress}%` }}
              aria-label={t("au_progress")}
              disabled={!duration}
            />
          )}
          <div className="ap-times">
            <span>{formatTime(current)}</span>
            <span>-{formatTime(duration - current)}</span>
          </div>
        </div>

        <div className="ap-vol">
          <Icon name="volume" />
          <input
            type="range"
            className="ap-bar"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ "--p": `${volume * 100}%` }}
            aria-label={t("au_volume")}
          />
        </div>

        <button className="ap-x" onClick={stop} aria-label={t("au_close")}>
          &times;
        </button>
      </div>
    </div>
  );
}
