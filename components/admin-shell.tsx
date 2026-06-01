import Link from "next/link";
import Image from "next/image";
import { BarChart3, Disc3, Home, LogOut, MessageSquare, Music2, PackageOpen, Settings } from "lucide-react";
import { signOut } from "@/app/admin/actions";
import faviconImage from "@/assets/favicon.png";

const items = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/beats", label: "Beats", icon: Music2 },
  { href: "/admin/sample-packs", label: "Sample Packs", icon: PackageOpen },
  { href: "/admin/licenses", label: "Licenses", icon: Disc3 },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-void">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-black/35 p-4 lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <Image src={faviconImage} alt="Alien Beatz Logo" width={40} height={40} className="rounded-lg" />
          <span className="font-display text-sm uppercase tracking-[0.2em] text-white">Alien Admin</span>
        </Link>
        <nav className="grid gap-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-white/65 hover:bg-white/10 hover:text-white">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 grid gap-2">
          <Link href="/" className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-white/55 hover:bg-white/10">
            <Home className="h-4 w-4" /> View site
          </Link>
          <form action={signOut}>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-white/55 hover:bg-white/10">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-void/85 px-4 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm uppercase tracking-[0.2em]">Alien Admin</span>
            <form action={signOut}>
              <button aria-label="Sign out"><LogOut className="h-5 w-5" /></button>
            </form>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0 rounded-md border border-white/10 px-3 py-2 text-xs text-white/70">{item.label}</Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
