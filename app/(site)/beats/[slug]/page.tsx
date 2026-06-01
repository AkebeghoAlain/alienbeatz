import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Gauge, KeyRound, Tags } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBeatBySlug, getSettings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const beat = await getBeatBySlug(slug);
  if (!beat) return { title: "Beat Not Found" };
  return {
    title: beat.title,
    description: beat.description ?? `License ${beat.title} by Mista Alino.`,
    openGraph: {
      title: beat.title,
      description: beat.description ?? "",
      images: beat.cover_image ? [beat.cover_image] : []
    }
  };
}

export default async function BeatDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [beat, settings] = await Promise.all([getBeatBySlug(slug), getSettings()]);
  if (!beat) notFound();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white/5">
            {beat.cover_image ? (
              <Image src={beat.cover_image} alt={beat.title} fill className="object-cover" priority />
            ) : null}
          </div>
          <AudioPlayer src={beat.preview_audio} title={beat.title} />
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">{beat.genre}</p>
          <h1 className="font-display text-4xl font-black uppercase leading-tight text-white sm:text-5xl">{beat.title}</h1>
          <p className="mt-5 text-base leading-7 text-white/62">{beat.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Meta icon={<Gauge className="h-4 w-4" />} label="BPM" value={String(beat.bpm)} />
            <Meta icon={<KeyRound className="h-4 w-4" />} label="Key" value={beat.musical_key} />
            <Meta icon={<Tags className="h-4 w-4" />} label="Mood" value={beat.mood ?? "Any"} />
            <Meta icon={<Calendar className="h-4 w-4" />} label="Uploaded" value={new Date(beat.created_at).toLocaleDateString()} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(beat.tags ?? []).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">#{tag}</span>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-black text-white">License Pricing</h2>
            <div className="grid gap-4">
              {beat.licenses.map((license) => (
                <div key={license.id} className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{license.license_name}</h3>
                      <span className="rounded-full bg-acid/15 px-3 py-1 text-sm font-bold text-acid">{formatPrice(license.price)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/58">{license.rights_description}</p>
                  </div>
                  <WhatsAppButton phone={settings.whatsapp_number} beatTitle={beat.title} licenseName={license.license_name} price={license.price} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-lg p-4">
      <div className="mb-2 text-acid">{icon}</div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{value}</p>
    </div>
  );
}
