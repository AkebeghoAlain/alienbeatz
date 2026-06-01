"use client";

import { useState } from "react";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("loading");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });
    setStatus(response.ok ? "done" : "error");
  }

  return (
    <form action={submit} className="grid gap-4">
      <input name="name" required placeholder="Your name" className="h-12 rounded-md border border-white/10 bg-black/25 px-4 text-sm text-white outline-none placeholder:text-white/35" />
      <input name="contact" required placeholder="WhatsApp or email" className="h-12 rounded-md border border-white/10 bg-black/25 px-4 text-sm text-white outline-none placeholder:text-white/35" />
      <textarea name="message" required rows={5} placeholder="Tell Mista Alino what you need" className="rounded-md border border-white/10 bg-black/25 p-4 text-sm text-white outline-none placeholder:text-white/35" />
      <button disabled={status === "loading"} className="rounded-md bg-white px-4 py-3 text-sm font-bold text-void hover:bg-acid disabled:opacity-60">
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
      {status === "done" && <p className="text-sm text-acid">Inquiry saved. You can also continue on WhatsApp for faster response.</p>}
      {status === "error" && <p className="text-sm text-red-300">Could not save inquiry. Check Supabase configuration or try WhatsApp.</p>}
    </form>
  );
}
