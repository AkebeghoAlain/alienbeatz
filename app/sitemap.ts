import type { MetadataRoute } from "next";
import { getBeats } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const beats = await getBeats({ availableOnly: true });

  return [
    "",
    "/beats",
    "/sample-packs",
    "/about",
    "/contact",
    ...beats.map((beat) => `/beats/${beat.slug}`)
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
