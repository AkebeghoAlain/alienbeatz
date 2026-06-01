import { deleteSamplePack } from "@/app/admin/actions";
import { SamplePackForm } from "@/components/admin-forms";
import { getSamplePacks } from "@/lib/data";

export default async function AdminSamplePacksPage() {
  const packs = await getSamplePacks();

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Catalog</p>
        <h1 className="font-display text-3xl font-black uppercase text-white">Sample Pack Management</h1>
      </div>
      <SamplePackForm />
      <div className="glass rounded-lg p-5">
        <h2 className="mb-4 text-xl font-bold text-white">All Sample Packs</h2>
        <div className="grid gap-3">
          {packs.map((pack) => (
            <div key={pack.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 p-4">
              <div>
                <p className="font-semibold text-white">{pack.title}</p>
                <p className="text-sm text-white/50">{pack.slug}</p>
              </div>
              <form action={deleteSamplePack}>
                <input type="hidden" name="id" value={pack.id} />
                <button className="rounded-md border border-red-400/30 px-3 py-2 text-xs font-bold text-red-200 hover:bg-red-400/10">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
