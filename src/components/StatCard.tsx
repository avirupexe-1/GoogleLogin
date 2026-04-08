export default function StatCard({ label, value, sub, delay = 0 }: { label: string; value: string; sub: string; delay?: number }) {
  return (
    <div className="stat-card fade-up" style={{ animationDelay: `${delay}s` }}>
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="font-display text-2xl font-light mb-1" style={{ color: "var(--text-primary)" }}>{value}</p>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
    </div>
  );
}