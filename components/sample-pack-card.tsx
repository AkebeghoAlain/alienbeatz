import Image from "next/image";
import { PackageOpen } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { SamplePack } from "@/lib/types";

export function SamplePackCard({ pack, whatsapp }: { pack: SamplePack; whatsapp?: string | null }) {
  return (
    <article className="glass overflow-hidden rounded-lg">
      <div className="relative aspect-[4/3] bg-white/5">
        {pack.cover_image ? (
          <Image src={pack.cover_image} alt={pack.title} fill className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-graphite to-nebula/50">
            <PackageOpen className="h-12 w-12 text-white/35" />
          </div>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold text-white">{pack.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/58">{pack.description}</p>
        </div>
        <AudioPlayer src={pack.preview_audio} title={pack.title} compact />
        <WhatsAppButton
          phone={whatsapp}
          samplePackTitle={pack.title}
          label="Ask on WhatsApp"
          className="w-full"
        />
      </div>
    </article>
  );
}
