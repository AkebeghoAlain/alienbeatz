import { brand, CURRENCY } from "@/lib/constants";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  // Use site-wide currency configuration from `lib/constants`.
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    maximumFractionDigits: 0
  }).format(price);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function buildWhatsAppUrl(input: {
  phone?: string | null;
  beatTitle?: string;
  licenseName?: string;
  price?: number;
  samplePackTitle?: string;
  customMessage?: string;
}) {
  const phone = (input.phone || brand.whatsappFallback).replace(/[^\d]/g, "");
  const lines = input.customMessage
    ? [input.customMessage]
    : input.samplePackTitle
      ? [
          `Hello ${brand.producer},`,
          "I want to ask about this sample pack.",
          "",
          `Sample Pack: ${input.samplePackTitle}`,
          "",
          "Please send purchase details."
        ]
      : [
          `Hello ${brand.producer},`,
          "I want to purchase this beat.",
          "",
          `Beat: ${input.beatTitle ?? "Selected beat"}`,
          `License: ${input.licenseName ?? "Premium"}`,
          `Price: ${typeof input.price === "number" ? formatPrice(input.price) : "To be confirmed"}`,
          "",
          "Please send payment instructions."
        ];

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function getPublicUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return path;
}
