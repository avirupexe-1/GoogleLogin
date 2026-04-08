"use client";
import { useState } from "react";

export default function SignOutButton({ action }: { action: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  return (
    <form action={async () => { setLoading(true); await action(); }}>
      <button type="submit" disabled={loading}
        style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 16px", borderRadius:"12px",
          fontSize:"14px", cursor: loading ? "not-allowed" : "pointer", transition:"all 0.2s ease",
          background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"rgba(239,68,68,0.8)",
          opacity: loading ? 0.6 : 1 }}>
        {loading ? "Signing out…" : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </>
        )}
      </button>
    </form>
  );
}