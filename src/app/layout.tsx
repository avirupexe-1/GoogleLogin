import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Aurum — Sign In",
  description: "Your personal dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Animated background orbs — shown on every page */}
        <div className="ambient-bg" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}