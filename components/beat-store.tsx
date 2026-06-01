"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { BeatCard } from "@/components/beat-card";
import type { BeatWithLicenses } from "@/lib/types";

export function BeatStore({ beats, whatsapp }: { beats: BeatWithLicenses[]; whatsapp?: string | null }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [mood, setMood] = useState("All");
  const [sort, setSort] = useState("Newest");

  const genres = ["All", ...Array.from(new Set(beats.map((beat) => beat.genre)))];
  const moods = [
    "All",
    ...Array.from(new Set(beats.map((beat) => beat.mood?.split(",")[0].trim()).filter(Boolean) as string[]))
  ];

  const filtered = useMemo(() => {
    const value = search.toLowerCase();
    return beats
      .filter((beat) => {
        const matchesSearch = [beat.title, beat.genre, beat.mood, beat.musical_key, ...(beat.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(value);
        const matchesGenre = genre === "All" || beat.genre === genre;
        const matchesMood = mood === "All" || beat.mood?.toLowerCase().includes(mood.toLowerCase());
        return matchesSearch && matchesGenre && matchesMood;
      })
      .sort((a, b) => {
        if (sort === "BPM Low") return a.bpm - b.bpm;
        if (sort === "BPM High") return b.bpm - a.bpm;
        if (sort === "Popular") return b.play_count - a.play_count;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [beats, genre, mood, search, sort]);

  return (
    <div className="space-y-8">
      <div className="glass grid gap-4 rounded-lg p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex min-h-12 items-center gap-3 rounded-md border border-white/10 bg-black/25 px-4">
          <Search className="h-4 w-4 text-white/45" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search beats, genre, mood, key"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
        </label>
        <Select label="Genre" value={genre} onChange={setGenre} options={genres} />
        <Select label="Mood" value={mood} onChange={setMood} options={moods} />
        <Select label="Sort" value={sort} onChange={setSort} options={["Newest", "Popular", "BPM Low", "BPM High"]} />
      </div>

      <div className="flex items-center gap-2 text-sm text-white/55">
        <SlidersHorizontal className="h-4 w-4" />
        {filtered.length} beats ready for WhatsApp purchase
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((beat) => (
          <BeatCard key={beat.id} beat={beat} whatsapp={whatsapp} />
        ))}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-void">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
