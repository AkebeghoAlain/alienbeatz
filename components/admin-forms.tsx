"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createBeat, createSamplePack, updateSettings } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/types";

const input = "h-11 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none placeholder:text-white/35";
const textarea = "rounded-md border border-white/10 bg-black/25 p-3 text-sm text-white outline-none placeholder:text-white/35";

export function BeatForm() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const { pending } = useFormStatus();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.currentTarget;
    if (!files?.length) return;
    const file = files[0];
    const url = URL.createObjectURL(file);

    if (name === "cover_image") {
      setCoverPreview((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return url;
      });
    }

    if (name === "preview_audio") {
      setAudioPreview((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return url;
      });
    }
  }

  return (
    <form action={createBeat} className="glass grid gap-4 rounded-lg p-5">
      <h2 className="text-xl font-bold text-white">Upload New Beat</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="title" required placeholder="Beat title" className={input} />
        <input name="slug" placeholder="custom-slug optional" className={input} />
        <input name="genre" required placeholder="Genre" className={input} />
        <input name="bpm" required type="number" min="1" placeholder="BPM" className={input} />
        <input name="musical_key" required placeholder="Musical key" className={input} />
        <input name="mood" placeholder="Mood" className={input} />
      </div>
      <textarea name="description" rows={4} placeholder="Description" className={textarea} />
      <input name="tags" placeholder="Tags separated by commas" className={input} />
      <div className="grid gap-4 md:grid-cols-2">
        <FileInput name="cover_image" label="Cover image" accept="image/*" onChange={handleFileChange} />
        <FileInput name="preview_audio" label="Preview audio" accept="audio/*" onChange={handleFileChange} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black/25 p-3 text-sm text-white/60">
          <p className="mb-2 font-semibold text-white">Cover preview</p>
          {coverPreview ? (
            <img src={coverPreview} alt="Cover preview" className="h-48 w-full rounded-md object-cover" />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-white/10 bg-white/5 text-xs text-white/50">
              No cover selected
            </div>
          )}
        </div>
        <div className="rounded-md border border-white/10 bg-black/25 p-3 text-sm text-white/60">
          <p className="mb-2 font-semibold text-white">Preview audio</p>
          {audioPreview ? (
            <audio controls src={audioPreview} className="w-full" />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-white/10 bg-white/5 text-xs text-white/50">
              No audio selected
            </div>
          )}
        </div>
      </div>
      {/* Prices are managed privately; pricing inputs removed to discuss on WhatsApp */}
      <textarea name="basic_rights" rows={2} placeholder="Basic rights description" className={textarea} />
      <textarea name="premium_rights" rows={2} placeholder="Premium rights description" className={textarea} />
      <textarea name="exclusive_rights" rows={2} placeholder="Exclusive rights description" className={textarea} />
      <div className="flex flex-wrap gap-4 text-sm text-white/70">
        <label className="flex items-center gap-2"><input name="featured" type="checkbox" className="accent-plasma" /> Featured</label>
        <label className="flex items-center gap-2"><input name="availability" type="checkbox" defaultChecked className="accent-plasma" /> Available</label>
      </div>
      <button disabled={pending} className="rounded-md bg-acid px-4 py-3 text-sm font-bold text-void hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {pending ? (
          <>
            <svg className="h-4 w-4 animate-spin text-void" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save Beat"
        )}
      </button>
    </form>
  );
}

export function SamplePackForm() {
  return (
    <form action={createSamplePack} className="glass grid gap-4 rounded-lg p-5">
      <h2 className="text-xl font-bold text-white">Upload Sample Pack</h2>
      <input name="title" required placeholder="Pack title" className={input} />
      <input name="slug" placeholder="custom-slug optional" className={input} />
      <textarea name="description" rows={4} placeholder="Description" className={textarea} />
      <div className="grid gap-4 md:grid-cols-3">
        <FileInput name="cover_image" label="Cover image" accept="image/*" />
        <FileInput name="preview_audio" label="Preview audio" accept="audio/*" />
        <FileInput name="zip_file" label="ZIP file" accept=".zip,application/zip" />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/70"><input name="featured" type="checkbox" className="accent-plasma" /> Featured</label>
      <button className="rounded-md bg-acid px-4 py-3 text-sm font-bold text-void hover:bg-white">Save Sample Pack</button>
    </form>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const socials = settings.social_links ?? {};
  const content = settings.homepage_content ?? {};
  const stats = content.stats ?? [];
  return (
    <form action={updateSettings} className="glass grid gap-4 rounded-lg p-5">
      <h2 className="text-xl font-bold text-white">Homepage & WhatsApp Settings</h2>
      <input name="whatsapp_number" required defaultValue={settings.whatsapp_number} placeholder="237..." className={input} />
      <input name="headline" defaultValue={content.headline} placeholder="Homepage headline" className={input} />
      <textarea name="subheadline" rows={3} defaultValue={content.subheadline} placeholder="Homepage subheadline" className={textarea} />
      <div className="grid gap-4 md:grid-cols-3">
        <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram URL" className={input} />
        <input name="youtube" defaultValue={socials.youtube} placeholder="YouTube URL" className={input} />
        <input name="tiktok" defaultValue={socials.tiktok} placeholder="TikTok URL" className={input} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <input name="beats_produced" defaultValue={stats[0]?.value} placeholder="Beats produced stat" className={input} />
        <input name="artist_sessions" defaultValue={stats[1]?.value} placeholder="Artist sessions stat" className={input} />
        <input name="genres_covered" defaultValue={stats[2]?.value} placeholder="Genres covered stat" className={input} />
      </div>
      <button className="rounded-md bg-acid px-4 py-3 text-sm font-bold text-void hover:bg-white">Save Settings</button>
    </form>
  );
}

function FileInput({
  name,
  label,
  accept,
  onChange
}: {
  name: string;
  label: string;
  accept: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="grid gap-2 rounded-md border border-white/10 bg-black/25 p-3 text-sm text-white/60">
      {label}
      <input
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        className="text-xs text-white/55 file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-bold file:text-void"
      />
    </label>
  );
}
