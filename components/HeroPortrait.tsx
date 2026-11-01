import Image from "next/image";

/** Portrait that dissolves into the dark background (CSS mask), revealed after the title. */
export default function HeroPortrait({ alt }: { alt: string }) {
  return (
    <div className="rise fx" style={{ animationDelay: ".45s", flex: "1 1 320px", minWidth: 0, maxWidth: 460, marginInline: "auto", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", inset: "8% -6% 0", background: "radial-gradient(closest-side, rgba(106,145,255,.22), transparent 75%)", filter: "blur(10px)" }} />
      <Image src="/yassine-aqejjaj.webp" alt={alt} width={1122} height={1402} priority sizes="(max-width: 640px) 80vw, 460px"
        style={{
          position: "relative", display: "block", width: "100%", height: "auto",
          WebkitMaskImage: "radial-gradient(ellipse closest-side at 50% 46%, #000 30%, rgba(0,0,0,.65) 62%, rgba(0,0,0,.2) 84%, transparent 100%)",
          maskImage: "radial-gradient(ellipse closest-side at 50% 46%, #000 30%, rgba(0,0,0,.65) 62%, rgba(0,0,0,.2) 84%, transparent 100%)",
          filter: "saturate(.95) contrast(1.03)",
        }} />
    </div>
  );
}
