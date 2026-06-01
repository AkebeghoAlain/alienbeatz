import type { Metadata } from "next";
import { SamplePackCard } from "@/components/sample-pack-card";
import { getSamplePacks, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sample Packs",
  description: "Browse sample packs from Alien Beatz by Mista Alino."
};

export default async function SamplePacksPage() {
  const [packs, settings] = await Promise.all([getSamplePacks(), getSettings()]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">Sample Packs</p>
        <h1 className="font-display text-4xl font-black uppercase text-white sm:text-5xl">Loops, Drums, Textures</h1>
        <p className="mt-4 text-white/60">Preview packs and ask Mista Alino for the manual ZIP purchase process through WhatsApp.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => <SamplePackCard key={pack.id} pack={pack} whatsapp={settings.whatsapp_number} />)}
      </div>
    </section>
  );
}
