import { useCountUp, useInView } from "@/hooks/use-reveal";

const stats = [
  { value: 10, prefix: "$", suffix: "M+", label: "Construction Volume Delivered" },
  { value: 200, prefix: "", suffix: "+", label: "Logistics Routes Managed" },
  { value: 98.7, prefix: "", suffix: "%", label: "Testing & Compliance Pass Rate", decimals: 1 },
  { value: 8, prefix: "", suffix: "+", label: "Real Estate Units Developed" },
];

function Stat({
  value,
  prefix,
  suffix,
  label,
  decimals = 0,
  start,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  decimals?: number;
  start: boolean;
}) {
  const current = useCountUp(value, start);
  return (
    <div className="border-t border-border pt-6">
      <p className="font-display text-4xl text-charcoal sm:text-5xl">
        {prefix}
        {current.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  return (
    <section id="stats" ref={ref} className="bg-background py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {stats.map((s) => (
          <Stat key={s.label} {...s} start={inView} />
        ))}
      </div>
    </section>
  );
}
