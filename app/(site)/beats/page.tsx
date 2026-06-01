import type { Metadata } from "next";
import { BeatStore } from "@/components/beat-store";
import { getBeats, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Beat Store",
  description: "Browse premium beats by Mista Alino and purchase manually through WhatsApp."
};

export default async function BeatsPage() {
  const [beats, settings] = await Promise.all([getBeats({ availableOnly: true }), getSettings()]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">Beat Store</p>
        <h1 className="font-display text-4xl font-black uppercase text-white sm:text-5xl">Browse Beats</h1>
        <p className="mt-4 text-white/60">Search by genre, mood, key, or BPM. Every beat uses WhatsApp purchase flow only, with no payment gateway integration.</p>
      </div>
      <BeatStore beats={beats} whatsapp={settings.whatsapp_number} />
    </section>
  );
}
