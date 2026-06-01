import type { Metadata } from "next";
import { MessageCircle, Send } from "lucide-react";
import { getSettings } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mista Alino for beats, sample packs, and custom production."
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">Contact</p>
          <h1 className="font-display text-4xl font-black uppercase text-white sm:text-5xl">Talk to Mista Alino</h1>
          <p className="mt-5 text-white/62">Use WhatsApp for beat purchases, licensing questions, custom work, or sample pack access.</p>
          <a href={buildWhatsAppUrl({ phone: settings.whatsapp_number, customMessage: "Hello Mista Alino,\nI want to ask about beats and sample packs." })} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-acid px-5 py-3 font-bold text-void hover:bg-white">
            <MessageCircle className="h-4 w-4" />
            Open WhatsApp
          </a>
        </div>
        <div className="glass rounded-lg p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-plasma/20 text-acid">
              <Send className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-bold text-white">Send an inquiry</h2>
              <p className="text-sm text-white/50">Saved in Supabase for admin follow-up.</p>
            </div>
          </div>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
