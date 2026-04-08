import Image from "next/image";

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Avatar({ src, name, size = 80 }: { src?: string | null; name?: string | null; size?: number }) {
  return (
    <div style={{ padding:"3px", background:"linear-gradient(135deg, #c9a96e, transparent 50%, #e8d5a3)",
      borderRadius:"50%", display:"inline-flex", flexShrink: 0 }}>
      <div style={{ borderRadius:"50%", overflow:"hidden", border:"2px solid #080c14", width: size, height: size }}>
        {src ? (
          <Image src={src} alt={name ?? "User"} width={size} height={size} style={{ display:"block" }} />
        ) : (
          <div style={{ width:size, height:size, display:"flex", alignItems:"center", justifyContent:"center",
            background:"linear-gradient(135deg, #1a3a7a, #080c14)", color:"#c9a96e",
            fontFamily:"'Cormorant Garamond', serif", fontSize: size * 0.3 }}>
            {getInitials(name)}
          </div>
        )}
      </div>
    </div>
  );
}