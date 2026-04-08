import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  async function handleSignIn() {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10 fade-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.05))", border: "1px solid rgba(201,169,110,0.3)" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L26 14L14 26L2 14L14 2Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
              <path d="M14 7L21 14L14 21L7 14L14 7Z" fill="rgba(201,169,110,0.3)" stroke="#c9a96e" strokeWidth="1"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl font-light text-gold-light tracking-wide mb-2">Aurum</h1>
          <p className="text-muted-custom text-sm tracking-widest uppercase">Personal Dashboard</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 fade-up anim-delay-1">
          <h2 className="font-display text-3xl font-light mb-2" style={{ color: "var(--text-primary)" }}>
            Welcome back
          </h2>
          <p className="text-muted-custom text-sm leading-relaxed mb-8">
            Sign in to access your personal workspace. New users are registered automatically.
          </p>

          <div className="gold-line mb-8" />

          <SignInButton action={handleSignIn} />

          <div className="divider my-6">
            <span>Secure · Private · No password needed</span>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl"
            style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.12)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We use Google OAuth 2.0. Your password is never shared with us.
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-8 fade-up anim-delay-2" style={{ color: "var(--text-muted)" }}>
          By continuing, you agree to our{" "}
          <span className="text-gold cursor-pointer hover:underline">Terms</span>{" "}&amp;{" "}
          <span className="text-gold cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </main>
  );
}