import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  phone?: string | null;
  beatTitle?: string;
  licenseName?: string;
  price?: number;
  samplePackTitle?: string;
  className?: string;
  label?: string;
};

export function WhatsAppButton(props: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(props)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-acid px-4 py-3 text-sm font-bold text-void transition hover:bg-white",
        props.className
      )}
    >
      <MessageCircle className="h-4 w-4" />
      {props.label ?? "Get Beat on WhatsApp"}
    </a>
  );
}
