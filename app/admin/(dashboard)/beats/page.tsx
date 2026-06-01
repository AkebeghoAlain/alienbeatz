import { deleteBeat, toggleBeat } from "@/app/admin/actions";
import { BeatForm } from "@/components/admin-forms";
import { getBeats } from "@/lib/data";

export default async function AdminBeatsPage() {
  const beats = await getBeats({ availableOnly: false });

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Catalog</p>
        <h1 className="font-display text-3xl font-black uppercase text-white">Beat Management</h1>
      </div>
      <BeatForm />
      <div className="glass overflow-hidden rounded-lg">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-xl font-bold text-white">All Beats</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-white/40">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Genre</th>
                <th className="p-4">BPM</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Available</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {beats.map((beat) => (
                <tr key={beat.id} className="border-t border-white/10">
                  <td className="p-4 font-semibold text-white">{beat.title}</td>
                  <td className="p-4 text-white/60">{beat.genre}</td>
                  <td className="p-4 text-white/60">{beat.bpm}</td>
                  <td className="p-4"><Toggle id={beat.id} field="featured" value={beat.featured} /></td>
                  <td className="p-4"><Toggle id={beat.id} field="availability" value={beat.availability} /></td>
                  <td className="p-4">
                    <form action={deleteBeat}>
                      <input type="hidden" name="id" value={beat.id} />
                      <button className="rounded-md border border-red-400/30 px-3 py-2 text-xs font-bold text-red-200 hover:bg-red-400/10">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Toggle({ id, field, value }: { id: string; field: string; value: boolean }) {
  return (
    <form action={toggleBeat}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={String(value)} />
      <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65 hover:bg-white/10">{value ? "On" : "Off"}</button>
    </form>
  );
}
