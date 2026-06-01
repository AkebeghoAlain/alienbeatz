import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, X, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import faviconImage from "@/assets/favicon.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src={faviconImage} alt="Alien Beatz Logo" width={40} height={40} className="rounded-lg" />
            <span className="font-display text-sm uppercase tracking-[0.24em]">Alien Beatz</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/58">
            Premium beats and sample packs by Mista Alino. Browse, preview, choose a license, and complete your order directly on WhatsApp.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-red">Explore</h3>
          <div className="grid gap-2 text-sm text-white/58">
            <Link href="/beats">Beat Store</Link>
            <Link href="/sample-packs">Sample Packs</Link>
            <Link href="/about">Producer Info</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Social</h3>
          <div className="flex gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:text-white" href="https://www.instagram.com/mistaalino1?igsh=bjJjdG83ODJmMzA4" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:text-white" href="https://www.tiktok.com/@mistaalino" aria-label="TikTok">
              <FaTiktok className="h-5 w-5" />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:text-white" href="https://www.facebook.com/akebegho.alain.39" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:text-white" href="https://x.com/Notpubl" aria-label="X/Twitter">
              <X className="h-5 w-5" />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:text-white" href="#" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
