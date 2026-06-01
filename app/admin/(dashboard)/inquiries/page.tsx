import { updateInquiryStatus } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import type { Inquiry } from "@/lib/types";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Messages</p>
        <h1 className="font-display text-3xl font-black uppercase text-white">Inquiries</h1>
      </div>
      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <article key={inquiry.id} className="glass rounded-lg p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-white">{inquiry.name}</h2>
                <p className="text-sm text-white/50">{inquiry.contact} · {new Date(inquiry.created_at).toLocaleString()}</p>
              </div>
              <form action={updateInquiryStatus} className="flex gap-2">
                <input type="hidden" name="id" value={inquiry.id} />
                <select name="status" defaultValue={inquiry.status} className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white">
                  <option className="bg-void" value="new">New</option>
                  <option className="bg-void" value="contacted">Contacted</option>
                  <option className="bg-void" value="closed">Closed</option>
                </select>
                <button className="rounded-md bg-white px-3 py-2 text-sm font-bold text-void">Update</button>
              </form>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/65">{inquiry.message}</p>
          </article>
        ))}
        {!inquiries.length && <div className="glass rounded-lg p-6 text-sm text-white/55">No inquiries yet.</div>}
      </div>
    </div>
  );
}

async function getInquiries(): Promise<Inquiry[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  return (data as Inquiry[] | null) ?? [];
}
