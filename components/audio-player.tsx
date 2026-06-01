"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AudioPlayerProps = {
  src?: string | null;
  title: string;
  compact?: boolean;
};

export function AudioPlayer({ src, title, compact }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.85);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  const toggle = async () => {
    if (!src) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
    }
  };

  return (
    <div className={cn("glass rounded-lg p-3", compact ? "space-y-2" : "space-y-4 p-4")}>
      {src ? <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} onTimeUpdate={(event) => {
        const audio = event.currentTarget;
        setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
      }} /> : null}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white text-void transition hover:bg-acid disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!src}
          aria-label={playing ? "Pause preview" : "Play preview"}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-acid to-plasma" style={{ width: `${src ? progress : 38}%` }} />
          </div>
        </div>
        {!compact && (
          <label className="hidden items-center gap-2 text-white/50 sm:flex">
            <Volume2 className="h-4 w-4" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-20 accent-plasma"
              aria-label="Volume"
            />
          </label>
        )}
      </div>
      {!src && <p className="text-xs text-white/45">Preview audio appears here after upload in Supabase Storage.</p>}
    </div>
  );
}
