import Link from "next/link";
import { ArrowRight, Disc3, Headphones, MessageCircle, Sparkles, Star } from "lucide-react";
import { BeatCard } from "@/components/beat-card";
import { MotionDiv, MotionSection } from "@/components/motion";
import { SamplePackCard } from "@/components/sample-pack-card";
import { SectionHeading } from "@/components/section-heading";
import { getBeats, getSamplePacks, getSettings } from "@/lib/data";

export default async function HomePage() {
  const [settings, beats, packs] = await Promise.all([
    getSettings(),
    getBeats({ availableOnly: true }),
    getSamplePacks()
  ]);
  const featured = beats.filter((beat) => beat.featured).slice(0, 3);
  const trending = [...beats].sort((a, b) => b.play_count - a.play_count).slice(0, 3);
  const stats = settings.homepage_content.stats ?? [];
  const testimonials = settings.homepage_content.testimonials ?? [];
  const genres = Array.from(new Set(beats.map((beat) => beat.genre)));

  return (
    <div>
      <section className="noise relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(168,85,247,0.32),transparent_24rem),radial-gradient(circle_at_80%_10%,rgba(36,240,196,0.18),transparent_22rem),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_18px),linear-gradient(to_bottom,rgba(5,4,9,0.28),#050409)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl content-center gap-10 px-4 py-20 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-acid backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Premium African producer marketplace
            </div>
            <h1 className="font-display text-5xl font-black uppercase leading-none text-white sm:text-6xl lg:text-7xl">
              {settings.homepage_content.headline ?? "Alien Beatz by Mista Alino"}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              {settings.homepage_content.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/beats" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-void hover:bg-acid">
                Browse Beats <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sample-packs" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur hover:bg-white/15">
                Sample Packs <Disc3 className="h-4 w-4" />
              </Link>
            </div>
          </MotionDiv>
          <div className="grid max-w-4xl gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-4">
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MotionSection initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Featured" title="Beats Ready To License" body="Preview instrumentals, choose the license that fits your release, then continue the conversation directly on WhatsApp." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((beat) => <BeatCard key={beat.id} beat={beat} whatsapp={settings.whatsapp_number} />)}
        </div>
      </MotionSection>

      <section className="bg-white/[0.03] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Trending" title="Most Played This Week" />
          <div className="grid gap-4 lg:grid-cols-3">
            {trending.map((beat, index) => (
              <Link key={beat.id} href={`/beats/${beat.slug}`} className="glass flex items-center gap-4 rounded-lg p-4 transition hover:border-acid/40">
                <span className="font-display text-3xl font-black text-white/20">0{index + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-md bg-plasma/20 text-acid">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{beat.title}</p>
                  <p className="text-sm text-white/50">{beat.genre} · {beat.bpm} BPM · {beat.musical_key}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Sample Packs" title="Build With Alien Textures" />
        <div className="grid gap-5 md:grid-cols-2">
          {packs.slice(0, 2).map((pack) => <SamplePackCard key={pack.id} pack={pack} whatsapp={settings.whatsapp_number} />)}
        </div>
      </section>

      <section className="bg-black/25 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">Genres</p>
            <h2 className="font-display text-3xl font-black uppercase text-white">Afro bounce, trap pressure, cinematic polish.</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {genres.map((genre) => (
                <span key={genre} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">{genre}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {testimonials.map((item) => (
              <div key={item.name} className="glass rounded-lg p-5">
                <Star className="mb-3 h-5 w-5 fill-amberlux text-amberlux" />
                <p className="text-sm leading-6 text-white/72">“{item.quote}”</p>
                <p className="mt-4 text-sm font-bold text-white">{item.name} <span className="text-white/40">· {item.location}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="glass rounded-lg p-8 sm:p-12">
          <MessageCircle className="mx-auto mb-4 h-10 w-10 text-acid" />
          <h2 className="font-display text-3xl font-black uppercase text-white">Ready for your next record?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">Pick a beat, choose Basic, Premium, or Exclusive, and Mista Alino will send manual payment instructions on WhatsApp.</p>
          <Link href="/beats" className="mt-6 inline-flex rounded-md bg-acid px-5 py-3 font-bold text-void hover:bg-white">Find Your Beat</Link>
        </div>
      </section>
    </div>
  );
}
