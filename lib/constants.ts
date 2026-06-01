import type { BeatWithLicenses, SamplePack, SiteSettings } from "@/lib/types";

export const brand = {
  name: "Alien Beatz by Mista Alino",
  producer: "Mista Alino",
  tagline: "Premium Afro, trap, drill, and cinematic instrumentals crafted in Cameroon.",
  whatsappFallback: process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER ?? "237600000000"
};

// Site-wide currency configuration (stored numeric prices are in XAF)
export const CURRENCY = {
  code: "XAF",
  locale: "fr-CM",
  label: "CFA"
};

export const licenseDefaults = [
  {
    license_name: "Basic",
    price: 25,
    rights_description: "MP3 lease, non-exclusive use, up to 10,000 streams, credit required."
  },
  {
    license_name: "Premium",
    price: 75,
    rights_description: "WAV lease, stems on request, non-exclusive use, up to 100,000 streams."
  },
  {
    license_name: "Exclusive",
    price: 300,
    rights_description: "Exclusive rights transfer after manual agreement and payment confirmation."
  }
];

export const demoBeats: BeatWithLicenses[] = [
  {
    id: "demo-1",
    title: "Afro Trap Night Vibes",
    slug: "afro-trap-night-vibes",
    description: "A polished Afro trap instrumental with deep 808s, airy vocal chops, and club-ready percussion.",
    genre: "Afro Trap",
    bpm: 102,
    musical_key: "F# Minor",
    mood: "Dark, Luxury",
    tags: ["afro trap", "808", "club", "cameroon"],
    cover_image: null,
    preview_audio: null,
    featured: true,
    availability: true,
    play_count: 1280,
    created_at: "2026-01-12T10:00:00Z",
    licenses: licenseDefaults.map((license, index) => ({
      ...license,
      id: `demo-1-license-${index}`,
      beat_id: "demo-1",
      created_at: "2026-01-12T10:00:00Z"
    }))
  },
  {
    id: "demo-2",
    title: "Midnight Vibes",
    slug: "midnight-vibes",
    description: "Smooth nocturnal R&B bounce with warm pads, guitar textures, and a clean hook pocket.",
    genre: "R&B",
    bpm: 88,
    musical_key: "C Minor",
    mood: "Smooth, Romantic",
    tags: ["rnb", "night", "guitar", "melodic"],
    cover_image: null,
    preview_audio: null,
    featured: true,
    availability: true,
    play_count: 980,
    created_at: "2026-02-06T10:00:00Z",
    licenses: licenseDefaults.map((license, index) => ({
      ...license,
      id: `demo-2-license-${index}`,
      beat_id: "demo-2",
      price: license.license_name === "Premium" ? 75 : license.price,
      created_at: "2026-02-06T10:00:00Z"
    }))
  },
  {
    id: "demo-3",
    title: "Douala Drill Signal",
    slug: "douala-drill-signal",
    description: "Aggressive drill drums, icy synth leads, and a sharp arrangement for confident street records.",
    genre: "Drill",
    bpm: 142,
    musical_key: "D Minor",
    mood: "Cold, Aggressive",
    tags: ["drill", "street", "dark", "rap"],
    cover_image: null,
    preview_audio: null,
    featured: false,
    availability: true,
    play_count: 760,
    created_at: "2026-02-25T10:00:00Z",
    licenses: licenseDefaults.map((license, index) => ({
      ...license,
      id: `demo-3-license-${index}`,
      beat_id: "demo-3",
      created_at: "2026-02-25T10:00:00Z"
    }))
  }
];

export const demoSamplePacks: SamplePack[] = [
  {
    id: "pack-1",
    title: "Alien Afro Percs Vol. 1",
    slug: "alien-afro-percs-vol-1",
    description: "Percussion loops, shaker grooves, and one-shots for Afrobeat and amapiano-influenced records.",
    cover_image: null,
    preview_audio: null,
    zip_file: null,
    featured: true,
    created_at: "2026-03-03T10:00:00Z"
  },
  {
    id: "pack-2",
    title: "Nebula Melodies",
    slug: "nebula-melodies",
    description: "Royalty-free melody loops with dark keys, plucks, and atmospheric textures.",
    cover_image: null,
    preview_audio: null,
    zip_file: null,
    featured: true,
    created_at: "2026-03-20T10:00:00Z"
  }
];

export const demoSettings: SiteSettings = {
  id: "settings",
  whatsapp_number: brand.whatsappFallback,
  social_links: {
    instagram: "https://instagram.com/mistaalino",
    youtube: "https://youtube.com/@mistaalino",
    tiktok: "https://tiktok.com/@mistaalino"
  },
  homepage_content: {
    headline: "Alien Beatz by Mista Alino",
    subheadline: brand.tagline,
    stats: [
      { label: "Beats Produced", value: "350+" },
      { label: "Artist Sessions", value: "90+" },
      { label: "Genres Covered", value: "12" },
      { label: "Based In", value: "Cameroon" }
    ],
    testimonials: [
      {
        name: "J. Malick",
        location: "Douala",
        quote: "The beat came mixed, loud, and ready. WhatsApp purchase was fast and personal."
      },
      {
        name: "Nadia Vox",
        location: "Yaounde",
        quote: "Mista Alino understands African bounce with international polish."
      }
    ]
  },
  created_at: "2026-01-01T10:00:00Z",
  updated_at: "2026-01-01T10:00:00Z"
};
