"use client";

import { useId, useRef } from "react";

function resample(peaks, count) {
  if (peaks.length === count) return peaks;
  return Array.from({ length: count }, (_, i) => {
    const start = Math.floor((i * peaks.length) / count);
    const end = Math.max(start + 1, Math.floor(((i + 1) * peaks.length) / count));
    const slice = peaks.slice(start, end);
    return slice.reduce((a, v) => a + v, 0) / slice.length;
  });
}

/** Sound bars that fill with gold as the audio plays. Click to jump to a position. */
export default function Waveform({ peaks, progress = 0, onSeek, bars = 120, label, className = "" }) {
  const ref = useRef(null);
  const clipId = `wv${useId().replace(/:/g, "")}`;
  const values = resample(peaks, bars);
  const width = bars * 3;

  const ratioAt = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") onSeek(Math.min(1, progress + 0.02));
    if (e.key === "ArrowLeft") onSeek(Math.max(0, progress - 0.02));
  };

  const rects = values.map((v, i) => {
    const h = Math.max(6, v * 100);
    return <rect key={i} x={i * 3} y={(100 - h) / 2} width={2} height={h} rx={1} />;
  });

  return (
    <div
      ref={ref}
      className={`wave ${className}`}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      onClick={(e) => onSeek(ratioAt(e.clientX))}
      onKeyDown={onKeyDown}
    >
      <svg viewBox={`0 0 ${width} 100`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <rect x={0} y={0} width={progress * width} height={100} />
          </clipPath>
        </defs>
        <g className="wave-bg">{rects}</g>
        <g className="wave-fg" clipPath={`url(#${clipId})`}>
          {rects}
        </g>
      </svg>
    </div>
  );
}
