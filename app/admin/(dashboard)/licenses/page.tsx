import { updateLicense } from "@/app/admin/actions";
import { getBeats } from "@/lib/data";

export default async function AdminLicensesPage() {
  const beats = await getBeats({ availableOnly: false });

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Pricing</p>
        <h1 className="font-display text-3xl font-black uppercase text-white">Manage Licenses</h1>
      </div>
            <div className="grid gap-4">
              {beats.map((beat) => (
                <div key={beat.id} className="glass rounded-lg p-5">
                  <h2 className="mb-4 text-xl font-bold text-white">{beat.title}</h2>
                  <div className="grid gap-4">
                    {beat.licenses.map((license) => (
                      <form key={license.id} action={updateLicense} className="grid gap-3 rounded-md border border-white/10 p-4 md:grid-cols-[160px_1fr_auto] md:items-center">
                        <input type="hidden" name="id" value={license.id} />
                        <p className="font-semibold text-white">{license.license_name}</p>
                        <input name="rights_description" defaultValue={license.rights_description} className="h-11 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none" />
                        <button className="rounded-md bg-white px-4 py-3 text-sm font-bold text-void hover:bg-acid">Save</button>
                      </form>
                    ))}
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
}
