# Alien Beatz by Mista Alino

A full-stack beat-selling and sample-pack catalog platform built with Next.js App Router, React, TypeScript, Tailwind CSS, Supabase, Framer Motion, and Lucide Icons.

The sales flow is intentionally WhatsApp-first. Customers browse beats, preview audio, select a license, and open WhatsApp with a prefilled purchase message. There is no Stripe, PayPal, Flutterwave, Paystack, checkout API, or payment gateway integration.

## Features

- Premium responsive public website with home, beat store, beat detail, sample packs, about, and contact pages
- Search, genre filter, mood filter, BPM sorting, beat metadata, tags, and license pricing
- Modern audio player with play/pause, progress, and volume controls
- Dynamic WhatsApp purchase links with beat title, license name, and price
- Supabase Auth protected admin dashboard
- Admin beat uploads with cover images and preview audio
- Admin sample pack uploads with cover images, preview audio, and ZIP files
- License management for Basic, Premium, and Exclusive options
- Homepage content and WhatsApp number settings
- Inquiry capture and admin follow-up status management
- SEO metadata, Open Graph, sitemap, and robots.txt
- Supabase PostgreSQL schema, RLS policies, and storage buckets

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Supabase Auth, Database, and Storage
- Framer Motion
- Lucide Icons

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER=237600000000
```

4. In Supabase SQL Editor, run:

```sql
-- paste database/schema.sql
```

5. Create the admin user in Supabase Auth:

- Go to Authentication > Users
- Add Mista Alino's admin email and password
- Use those credentials at `/admin/login`

6. Start development:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Storage

The schema creates these buckets:

- `beat-previews` for beat and sample-pack audio previews
- `cover-images` for beat and sample-pack artwork
- `sample-pack-zips` for downloadable ZIP files

Cover images and previews are public by design. ZIP files are private so the producer can manually send access after WhatsApp payment confirmation.

## Database Tables

- `beats`
- `licenses`
- `sample_packs`
- `settings`
- `inquiries`

Row Level Security is enabled. Public users can read available catalog content and create inquiries. Authenticated admins can manage content.

## WhatsApp Purchase Flow

Every purchase button opens:

```text
https://wa.me/{number}?text={prefilled-message}
```

Example message:

```text
Hello Mista Alino,
I want to purchase this beat.

Beat: Midnight Vibes
License: Premium
Price: XAF 75

Please send payment instructions.
```

## Deployment

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add the environment variables from `.env.example`.
4. Run `database/schema.sql` in the production Supabase project.
5. Create the admin user in Supabase Auth.
6. Deploy.

## Payment Policy

This platform must remain WhatsApp-only for sales conversion. Do not add payment gateways or external checkout services.
