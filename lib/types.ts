export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Beat = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  genre: string;
  bpm: number;
  musical_key: string;
  mood: string | null;
  tags: string[] | null;
  cover_image: string | null;
  preview_audio: string | null;
  featured: boolean;
  availability: boolean;
  play_count: number;
  created_at: string;
};

export type License = {
  id: string;
  beat_id: string;
  license_name: "Basic" | "Premium" | "Exclusive" | string;
  price: number;
  rights_description: string;
  created_at: string;
};

export type SamplePack = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  preview_audio: string | null;
  zip_file: string | null;
  featured: boolean;
  created_at: string;
};

export type SiteSettings = {
  id: string;
  whatsapp_number: string;
  social_links: Record<string, string>;
  homepage_content: {
    headline?: string;
    subheadline?: string;
    stats?: Array<{ label: string; value: string }>;
    testimonials?: Array<{ name: string; quote: string; location?: string }>;
  };
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  contact: string;
  message: string;
  beat_id: string | null;
  license_name: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

export type BeatWithLicenses = Beat & {
  licenses: License[];
};
