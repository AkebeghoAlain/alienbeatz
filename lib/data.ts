import { unstable_noStore as noStore } from "next/cache";
import { demoBeats, demoSamplePacks, demoSettings } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { BeatWithLicenses, SamplePack, SiteSettings } from "@/lib/types";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getSettings(): Promise<SiteSettings> {
  noStore();
  if (!hasSupabaseEnv()) return demoSettings;

  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*").limit(1).maybeSingle();
  return (data as SiteSettings | null) ?? demoSettings;
}

export async function getBeats(options?: {
  featured?: boolean;
  search?: string;
  genre?: string;
  mood?: string;
  availableOnly?: boolean;
}): Promise<BeatWithLicenses[]> {
  noStore();
  if (!hasSupabaseEnv()) return filterDemoBeats(options);

  const supabase = await createClient();
  let query = supabase
    .from("beats")
    .select("*, licenses(*)")
    .order("created_at", { ascending: false });

  if (options?.featured) query = query.eq("featured", true);
  if (options?.availableOnly ?? true) query = query.eq("availability", true);
  if (options?.genre) query = query.eq("genre", options.genre);
  if (options?.mood) query = query.ilike("mood", `%${options.mood}%`);
  if (options?.search) query = query.or(`title.ilike.%${options.search}%,genre.ilike.%${options.search}%,mood.ilike.%${options.search}%`);

  const { data, error } = await query;
  if (error || !data) return filterDemoBeats(options);
  return data as BeatWithLicenses[];
}

export async function getBeatBySlug(slug: string): Promise<BeatWithLicenses | null> {
  noStore();
  if (!hasSupabaseEnv()) return demoBeats.find((beat) => beat.slug === slug) ?? null;

  const supabase = await createClient();
  const { data } = await supabase.from("beats").select("*, licenses(*)").eq("slug", slug).maybeSingle();
  return (data as BeatWithLicenses | null) ?? demoBeats.find((beat) => beat.slug === slug) ?? null;
}

export async function getSamplePacks(): Promise<SamplePack[]> {
  noStore();
  if (!hasSupabaseEnv()) return demoSamplePacks;

  const supabase = await createClient();
  const { data, error } = await supabase.from("sample_packs").select("*").order("created_at", { ascending: false });
  if (error || !data) return demoSamplePacks;
  return data as SamplePack[];
}

function filterDemoBeats(options?: {
  featured?: boolean;
  search?: string;
  genre?: string;
  mood?: string;
  availableOnly?: boolean;
}) {
  return demoBeats.filter((beat) => {
    if (options?.featured && !beat.featured) return false;
    if ((options?.availableOnly ?? true) && !beat.availability) return false;
    if (options?.genre && beat.genre !== options.genre) return false;
    if (options?.mood && !beat.mood?.toLowerCase().includes(options.mood.toLowerCase())) return false;
    if (options?.search) {
      const haystack = [beat.title, beat.genre, beat.mood, ...(beat.tags ?? [])].join(" ").toLowerCase();
      return haystack.includes(options.search.toLowerCase());
    }
    return true;
  });
}
