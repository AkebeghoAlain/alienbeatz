import Image from "next/image";
import Link from "next/link";
import { Gauge, KeyRound, Music } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Waveform } from "@/components/waveform";
import type { BeatWithLicenses } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function BeatCard({ beat, whatsapp }: { beat: BeatWithLicenses; whatsapp?: string | null }) {
  const defaultLicense = beat.licenses.find((license) => license.license_name === "Premium") ?? beat.licenses[0];

  return (
    <article className="glass group overflow-hidden rounded-lg">
      <Link href={`/beats/${beat.slug}`} className="relative block aspect-square overflow-hidden bg-white/5">
        {/* Image section remains the same */}
        {beat.cover_image ? (
          <Image src={beat.cover_image} alt={beat.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-graphite to-nebula/40">
            <Music className="h-12 w-12 text-white/30" />
          </div>
        )}
        <div className="absolute left-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-xs font-semibold text-acid backdrop-blur">
          {beat.genre}
        </div>
      </Link>
      {/* Reduced padding from p-4 to p-3, removed space-y-4 */}
      <div className="p-3">
        <Link href={`/beats/${beat.slug}`} className="line-clamp-1 text-base font-bold text-white hover:text-acid">
          {beat.title}
        </Link>
        <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-white/55">
          <span className="inline-flex items-center gap-1"><Gauge className="h-3 w-3" />{beat.bpm} BPM</span>
          <span className="inline-flex items-center gap-1"><KeyRound className="h-3 w-3" />{beat.musical_key}</span>
        </div>
        
        <div className="mt-3 flex items-center justify-between gap-2">
          <Waveform />
          <div className="text-right">
            <p className="text-[11px] text-white/45">From</p>
            <p className="font-semibold text-white text-sm">{defaultLicense ? formatPrice(defaultLicense.price) : "Ask"}</p>
          </div>
        </div>
        
        <div className="mt-2">
          <AudioPlayer src={beat.preview_audio} title={beat.title} compact />
        </div>
        
        <WhatsAppButton
          phone={whatsapp}
          beatTitle={beat.title}
          licenseName={defaultLicense?.license_name}
          price={defaultLicense?.price}
          className="w-full mt-2 text-sm py-1.5"
        />
      </div>
    </article>
  );
}