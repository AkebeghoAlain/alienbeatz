"use client";

import Image from "next/image";
import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import faviconImage from "@/assets/favicon.png";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(signIn, null as { error?: string } | null);

  return (
    <form action={action} className="glass mx-auto grid w-full max-w-md gap-4 rounded-lg p-6">
      <div className="mb-2 flex items-center justify-center">
        <Image src={faviconImage} alt="Alien Beatz Logo" width={48} height={48} className="rounded-lg" />
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-acid">Admin Login</p>
        <h1 className="font-display text-3xl font-black uppercase text-white">Mista Alino Dashboard</h1>
      </div>
      <input name="email" type="email" required placeholder="Admin email" className="h-12 rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35" />
      <input name="password" type="password" required placeholder="Password" className="h-12 rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35" />
      <button disabled={pending} className="rounded-md bg-acid px-4 py-3 text-sm font-bold text-void hover:bg-white disabled:opacity-60">
        {pending ? "Signing in..." : "Sign In"}
      </button>
      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
    </form>
  );
}
