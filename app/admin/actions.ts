"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

async function requireSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are required for admin actions.");
  }
  return createClient();
}

async function uploadFile(bucket: string, file: File | null, prefix: string) {
  if (!file || file.size === 0) return null;
  const supabase = await requireSupabase();
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${prefix}/${crypto.randomUUID()}.${extension}`;
  const fileBody = await file.arrayBuffer();
  const { error } = await supabase.storage.from(bucket).upload(path, new Uint8Array(fileBody), { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function signIn(_: unknown, formData: FormData) {
  const supabase = await requireSupabase();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect("/admin");
}

export async function signOut() {
  const supabase = await requireSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createBeat(formData: FormData) {
  const supabase = await requireSupabase();
  const title = String(formData.get("title"));
  const cover = await uploadFile("cover-images", formData.get("cover_image") as File | null, "beats");
  const audio = await uploadFile("beat-previews", formData.get("preview_audio") as File | null, "beats");

  const baseSlug = slugify(String(formData.get("slug") || title));
  let beat = null as any;
  let slug = baseSlug;

  // Try inserting up to 5 times, regenerating the slug if there's a unique constraint conflict
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from("beats")
      .insert({
        title,
        slug,
        description: String(formData.get("description") || ""),
        genre: String(formData.get("genre")),
        bpm: Number(formData.get("bpm")),
        musical_key: String(formData.get("musical_key")),
        mood: String(formData.get("mood") || ""),
        tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
        cover_image: cover,
        preview_audio: audio,
        featured: formData.get("featured") === "on",
        availability: formData.get("availability") === "on"
      })
      .select("id")
      .single();

    if (!error) {
      beat = data;
      break;
    }

    // If slug conflict, generate a new slug and retry
    const msg = String(error?.message || "");
    if (msg.includes("duplicate key") || msg.includes("unique constraint") || msg.includes("beats_slug_key")) {
      slug = `${baseSlug}-${crypto.randomUUID().split("-")[0]}`;
      continue;
    }

    // For other errors, abort
    throw new Error(error.message);
  }

  if (!beat) throw new Error("Could not create beat after multiple slug attempts.");

  const { error: licensesError } = await supabase.from("licenses").insert([
    {
      beat_id: beat.id,
      license_name: "Basic",
      price: Number(formData.get("basic_price") || 25),
      rights_description: String(formData.get("basic_rights") || "MP3 lease, non-exclusive use, credit required.")
    },
    {
      beat_id: beat.id,
      license_name: "Premium",
      price: Number(formData.get("premium_price") || 75),
      rights_description: String(formData.get("premium_rights") || "WAV lease, non-exclusive use, expanded streaming rights.")
    },
    {
      beat_id: beat.id,
      license_name: "Exclusive",
      price: Number(formData.get("exclusive_price") || 300),
      rights_description: String(formData.get("exclusive_rights") || "Exclusive rights after manual agreement and payment confirmation.")
    }
  ]);

  if (licensesError) throw new Error(licensesError.message);

  revalidatePath("/");
  revalidatePath("/beats");
  revalidatePath("/admin");
  // Redirect with a query flag so the admin UI can show a success prompt
  redirect("/admin/beats?created=1");
}

export async function deleteBeat(formData: FormData) {
  const supabase = await requireSupabase();
  await supabase.from("beats").delete().eq("id", String(formData.get("id")));
  revalidatePath("/beats");
  revalidatePath("/admin/beats");
}

export async function toggleBeat(formData: FormData) {
  const supabase = await requireSupabase();
  await supabase
    .from("beats")
    .update({ [String(formData.get("field"))]: formData.get("value") !== "true" })
    .eq("id", String(formData.get("id")));
  revalidatePath("/beats");
  revalidatePath("/admin/beats");
}

export async function createSamplePack(formData: FormData) {
  const supabase = await requireSupabase();
  const title = String(formData.get("title"));
  const cover = await uploadFile("cover-images", formData.get("cover_image") as File | null, "sample-packs");
  const audio = await uploadFile("beat-previews", formData.get("preview_audio") as File | null, "sample-packs");
  const zip = await uploadFile("sample-pack-zips", formData.get("zip_file") as File | null, "sample-packs");

  const { error } = await supabase.from("sample_packs").insert({
    title,
    slug: slugify(String(formData.get("slug") || title)),
    description: String(formData.get("description") || ""),
    cover_image: cover,
    preview_audio: audio,
    zip_file: zip,
    featured: formData.get("featured") === "on"
  });

  if (error) throw new Error(error.message);
  revalidatePath("/sample-packs");
  revalidatePath("/admin/sample-packs");
  redirect("/admin/sample-packs");
}

export async function deleteSamplePack(formData: FormData) {
  const supabase = await requireSupabase();
  await supabase.from("sample_packs").delete().eq("id", String(formData.get("id")));
  revalidatePath("/sample-packs");
  revalidatePath("/admin/sample-packs");
}

export async function updateSettings(formData: FormData) {
  const supabase = await requireSupabase();
  const payload = {
    whatsapp_number: String(formData.get("whatsapp_number")),
    social_links: {
      instagram: String(formData.get("instagram") || ""),
      youtube: String(formData.get("youtube") || ""),
      tiktok: String(formData.get("tiktok") || "")
    },
    homepage_content: {
      headline: String(formData.get("headline") || "Alien Beatz by Mista Alino"),
      subheadline: String(formData.get("subheadline") || ""),
      stats: [
        { label: "Beats Produced", value: String(formData.get("beats_produced") || "350+") },
        { label: "Artist Sessions", value: String(formData.get("artist_sessions") || "90+") },
        { label: "Genres Covered", value: String(formData.get("genres_covered") || "12") },
        { label: "Based In", value: "Cameroon" }
      ]
    }
  };

  const { data: existing } = await supabase.from("settings").select("id").limit(1).maybeSingle();
  const query = existing
    ? supabase.from("settings").update(payload).eq("id", existing.id)
    : supabase.from("settings").insert(payload);

  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function updateInquiryStatus(formData: FormData) {
  const supabase = await requireSupabase();
  await supabase
    .from("inquiries")
    .update({ status: String(formData.get("status")) })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/inquiries");
}

export async function updateLicense(formData: FormData) {
  const supabase = await requireSupabase();
  const payload: Record<string, any> = {
    rights_description: String(formData.get("rights_description"))
  };
  const priceRaw = formData.get("price");
  if (priceRaw !== null) {
    const p = Number(priceRaw);
    if (!Number.isNaN(p)) payload.price = p;
  }

  await supabase.from("licenses").update(payload).eq("id", String(formData.get("id")));
  revalidatePath("/admin/licenses");
  revalidatePath("/beats");
}
