import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Avatar from "@/components/Avatar";
import StatCard from "@/components/StatCard";
import SignOutButton from "@/components/SignOutButton";

function formatDate(date: Date | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });
  if (!dbUser) redirect("/");

  const joinDate = formatDate(dbUser.createdAt);
  const daysSince = Math.floor((Date.now() - new Date(dbUser.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Nav */}
        <nav className="flex items-center justify-between mb-12 fade-in">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.05))", border: "1px solid rgba(201,169,110,0.3)" }}>
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <path d="M14 2L26 14L14 26L2 14L14 2Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                <path d="M14 7L21 14L14 21L7 14L14 7Z" fill="rgba(201,169,110,0.3)" stroke="#c9a96e" strokeWidth="1"/>
              </svg>
            </div>
            <span className="font-display text-xl text-gold-light tracking-wide">Aurum</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>Active session</span>
            </div>
            <SignOutButton action={handleSignOut} />
          </div>
        </nav>

        {/* Profile */}
        <div className="glass-card p-8 mb-6 fade-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar src={dbUser.image} name={dbUser.name} size={80} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="font-display text-3xl sm:text-4xl font-light" style={{ color: "var(--text-primary)" }}>
                  {dbUser.name ?? "Anonymous User"}
                </h1>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                  ✓ Verified
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>{dbUser.email}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Member since {joinDate}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Days Active" value={String(daysSince || 1)} sub="since you joined" delay={0.1} />
          <StatCard label="Auth Provider" value="Google" sub="OAuth 2.0" delay={0.2} />
          <div className="stat-card fade-up col-span-2 sm:col-span-1" style={{ animationDelay: "0.3s" }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Status</p>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="font-display text-2xl font-light" style={{ color: "#4ade80" }}>Active</span>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Session valid</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="glass-card p-6 mb-6 fade-up anim-delay-3">
          <h3 className="font-display text-xl font-light mb-5" style={{ color: "var(--text-primary)" }}>Account Details</h3>
          <div className="gold-line mb-5" />
          <div className="space-y-5">
            {[
              { label: "Full Name",      value: dbUser.name ?? "—",   mono: false },
              { label: "Email",          value: dbUser.email ?? "—",  mono: false },
              { label: "User ID",        value: dbUser.id,             mono: true  },
              { label: "Joined",         value: joinDate,              mono: false },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-xs uppercase tracking-widest shrink-0"
                  style={{ color: "var(--text-muted)", width: "120px", paddingTop: "2px" }}>
                  {label}
                </span>
                <span style={{
                  color: mono ? "var(--gold)" : "var(--text-primary)",
                  fontFamily: mono ? "monospace" : "inherit",
                  fontSize: mono ? "11px" : "14px",
                  wordBreak: "break-all",
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="glass-card p-6 fade-up anim-delay-4">
          <h3 className="font-display text-xl font-light mb-5" style={{ color: "var(--text-primary)" }}>How Your Auth Works</h3>
          <div className="gold-line mb-5" />
          <div className="space-y-3">
            {[
              { step: "01", title: "Google OAuth 2.0", desc: "You signed in via Google. Your password never touches our servers." },
              { step: "02", title: "PostgreSQL Storage", desc: "Your profile is saved in a Neon PostgreSQL database using Drizzle ORM." },
              { step: "03", title: "Session Cookie", desc: "NextAuth creates an encrypted cookie. Every page reads it to confirm you're logged in." },
              { step: "04", title: "Middleware Protection", desc: "middleware.ts runs on every request — if no session, you're redirected to login." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="font-display text-2xl font-light shrink-0" style={{ color: "var(--gold)", opacity: 0.5, width: "32px" }}>
                  {step}
                </span>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs mt-8 pb-4" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
          Aurum · Next.js · NextAuth · PostgreSQL · Vercel
        </p>
      </div>
    </main>
  );
}