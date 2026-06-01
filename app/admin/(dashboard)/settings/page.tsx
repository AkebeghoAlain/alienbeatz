import { SettingsForm } from "@/components/admin-forms";
import { getSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Configuration</p>
        <h1 className="font-display text-3xl font-black uppercase text-white">Settings</h1>
      </div>
      <SettingsForm settings={settings} />
      <div className="glass rounded-lg p-5">
        <h2 className="text-xl font-bold text-white">Important</h2>
        <p className="mt-2 text-sm leading-6 text-white/58">
          WhatsApp is the only checkout path in this platform. Do not add Stripe, PayPal, Flutterwave, Paystack, or any payment processor.
        </p>
      </div>
    </div>
  );
}
