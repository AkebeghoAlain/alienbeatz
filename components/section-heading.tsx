export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-acid">{eyebrow}</p>
      <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-sm leading-6 text-white/58 sm:text-base">{body}</p>}
    </div>
  );
}
