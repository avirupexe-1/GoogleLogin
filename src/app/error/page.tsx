import Link from "next/link";

export default function ErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  const messages: Record<string, string> = {
    Configuration: "Server configuration error.",
    AccessDenied: "You don't have permission to sign in.",
    Default: "An unexpected error occurred. Please try again.",
  };

  const message = messages[searchParams.error ?? "Default"] ?? messages.Default;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-10 w-full max-w-md text-center fade-up">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="font-display text-3xl font-light mb-3" style={{ color: "var(--text-primary)" }}>Auth Error</h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>{message}</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
          style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold)" }}>
          ← Back to Sign In
        </Link>
      </div>
    </main>
  );
}