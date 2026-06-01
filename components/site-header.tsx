"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CURRENCY } from "@/lib/constants";
import faviconImage from "@/assets/favicon.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/beats", label: "Beats" },
  { href: "/sample-packs", label: "Sample Packs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src={faviconImage} alt="Alien Beatz Logo" width={40} height={40} className="rounded-lg" />
          <span className="leading-tight">
            <span className="block font-display text-sm uppercase tracking-[0.24em] text-white">Alien Beatz</span>
            <span className="block text-xs text-white/55">by Mista Alino</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-4 py-2 text-sm text-white/68 transition hover:bg-white/10 hover:text-white",
                pathname === item.href && "bg-white/10 text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/beats"
          className="hidden rounded-md bg-white px-4 py-2 text-sm font-semibold text-void transition hover:bg-acid md:inline-flex"
        >
          Browse Beats
        </Link>
        <span className="hidden md:inline-block text-xs text-white/60 ml-3">Prices in {CURRENCY.code}</span>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-white/10 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-white/75 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
