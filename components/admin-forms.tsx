import { createBeat, createSamplePack, updateSettings } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/types";

const input = "h-11 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none placeholder:text-white/35";
const textarea = "rounded-md border border-white/10 bg-black/25 p-3 text-sm text-white outline-none placeholder:text-white/35";

export function BeatForm() {
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
        <FileInput name="cover_image" label="Cover image" accept="image/*" />
        <FileInput name="preview_audio" label="Preview audio" accept="audio/*" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <input name="basic_price" type="number" placeholder="Basic price" className={input} />
        <input name="premium_price" type="number" placeholder="Premium price" className={input} />
        <input name="exclusive_price" type="number" placeholder="Exclusive price" className={input} />
      </div>
      <textarea name="basic_rights" rows={2} placeholder="Basic rights description" className={textarea} />
      <textarea name="premium_rights" rows={2} placeholder="Premium rights description" className={textarea} />
      <textarea name="exclusive_rights" rows={2} placeholder="Exclusive rights description" className={textarea} />
      <div className="flex flex-wrap gap-4 text-sm text-white/70">
        <label className="flex items-center gap-2"><input name="featured" type="checkbox" className="accent-plasma" /> Featured</label>
        <label className="flex items-center gap-2"><input name="availability" type="checkbox" defaultChecked className="accent-plasma" /> Available</label>
      </div>
      <button className="rounded-md bg-acid px-4 py-3 text-sm font-bold text-void hover:bg-white">Save Beat</button>
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

function FileInput({ name, label, accept }: { name: string; label: string; accept: string }) {
  return (
    <label className="grid gap-2 rounded-md border border-white/10 bg-black/25 p-3 text-sm text-white/60">
      {label}
      <input name={name} type="file" accept={accept} className="text-xs text-white/55 file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-bold file:text-void" />
    </label>
  );
}
