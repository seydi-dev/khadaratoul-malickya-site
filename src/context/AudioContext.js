"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const AudioContext = createContext(null);

/** One shared <audio> element for the whole site, so playback survives page changes. */
export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const startRatioRef = useRef(null);
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => {
      setDuration(audio.duration || 0);
      if (startRatioRef.current !== null && audio.duration) {
        audio.currentTime = startRatioRef.current * audio.duration;
        setCurrent(audio.currentTime);
        startRatioRef.current = null;
      }
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, []);

  const play = useCallback(
    (next, startRatio = null) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (track && next.src === track.src) {
        if (startRatio !== null && audio.duration) {
          audio.currentTime = startRatio * audio.duration;
          setCurrent(audio.currentTime);
          audio.play().catch(() => {});
          return;
        }
        audio.paused ? audio.play().catch(() => {}) : audio.pause();
        return;
      }
      startRatioRef.current = startRatio;
      audio.src = next.src;
      setTrack(next);
      setCurrent(0);
      setDuration(0);
      audio.play().catch(() => {});
    },
    [track]
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  }, [track]);

  const seek = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setCurrent(seconds);
  }, []);

  const setVolume = useCallback((value) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    setVolumeState(value);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setTrack(null);
    setCurrent(0);
    setDuration(0);
  }, []);

  return (
    <AudioContext.Provider
      value={{ track, playing, current, duration, volume, play, toggle, seek, setVolume, stop }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside an AudioProvider");
  return ctx;
}
