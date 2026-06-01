import type { Metadata } from "next";
import { Award, Globe2, Radio, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Mista Alino and Alien Beatz."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">Producer</p>
          <h1 className="font-display text-4xl font-black uppercase text-white sm:text-5xl">Mista Alino crafts premium beats for artists building serious records.</h1>
          <p className="mt-6 text-base leading-8 text-white/62">
            Alien Beatz is a Cameroon-based producer marketplace focused on Afro rhythms, trap energy, drill movement, R&B textures, and cinematic sound design. The platform keeps the buying process personal: artists preview music, select licenses, and complete payment instructions directly with Mista Alino on WhatsApp.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            { icon: <SlidersHorizontal className="h-5 w-5" />, title: "Studio-ready sound", body: "Clean arrangements and polished previews built for artists, labels, and content creators." },
            { icon: <Globe2 className="h-5 w-5" />, title: "African market fit", body: "Manual WhatsApp sales flow designed for Cameroon and surrounding markets." },
            { icon: <Radio className="h-5 w-5" />, title: "Multiple licenses", body: "Basic, Premium, and Exclusive options with clear rights descriptions." },
            { icon: <Award className="h-5 w-5" />, title: "Premium catalog", body: "Curated beats, sample packs, and custom production inquiry paths." }
          ].map((item) => (
            <div key={item.title} className="glass rounded-lg p-5">
              <div className="mb-3 text-acid">{item.icon}</div>
              <h2 className="font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/58">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
