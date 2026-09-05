import { BarChart3, Disc3, MessageSquare, Music2, PackageOpen } from "lucide-react";
import { getBeats, getSamplePacks } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const [beats, packs, inquiries] = await Promise.all([getBeats({ availableOnly: false }), getSamplePacks(), getInquiryCount()]);
  const featured = beats.filter((beat) => beat.featured).length;
  const available = beats.filter((beat) => beat.availability).length;

  return (
    <div className="space-y-8">
      <Header title="Dashboard Overview" body="Manage the Alien Beatz catalog, WhatsApp funnel, and admin content." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat icon={<Music2 className="h-5 w-5" />} label="Total Beats" value={beats.length} />
        <Stat icon={<Disc3 className="h-5 w-5" />} label="Featured" value={featured} />
        <Stat icon={<BarChart3 className="h-5 w-5" />} label="Available" value={available} />
        <Stat icon={<PackageOpen className="h-5 w-5" />} label="Sample Packs" value={packs.length} />
        <Stat icon={<MessageSquare className="h-5 w-5" />} label="Inquiries" value={inquiries} />
      </div>
      <div className="glass rounded-lg p-5">
        <h2 className="text-xl font-bold text-white">Manual Sales Workflow</h2>
        <p className="mt-2 text-sm leading-6 text-white/58">
          Customers preview beats, select Basic, Premium, or Exclusive licenses, and open WhatsApp with the beat title and license prefilled so pricing can be discussed directly. No payment processor is integrated.
        </p>
      </div>
    </div>
  );
}

async function getInquiryCount() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return 0;
  const supabase = await createClient();
  const { count } = await supabase.from("inquiries").select("*", { count: "exact", head: true });
  return count ?? 0;
}

function Header({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Admin</p>
      <h1 className="font-display text-3xl font-black uppercase text-white">{title}</h1>
      <p className="mt-2 text-sm text-white/55">{body}</p>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass rounded-lg p-5">
      <div className="mb-4 text-acid">{icon}</div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{label}</p>
    </div>
  );
}
