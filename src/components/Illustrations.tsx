import { ArtUse } from "./ProductArt";

const KESTREL_PATH =
  "M2 15 C13 5 25 7 32 19 C39 7 51 5 62 15 C52 14 45 18 39 26 L35 39 L32 31 L29 39 L25 26 C19 18 12 14 2 15 Z";

export function KestrelMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 42" className={className} aria-hidden="true" focusable="false">
      <path d={KESTREL_PATH} fill="currentColor" />
      <circle cx="32" cy="19" r="2.2" fill="var(--flour)" />
    </svg>
  );
}

export function Wheat({ className }: { className?: string }) {
  const grains = Array.from({ length: 7 });
  return (
    <svg viewBox="0 0 40 160" className={className} aria-hidden="true" focusable="false">
      <path d="M20 160 V30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {grains.map((_, i) => (
        <g key={i}>
          <ellipse cx="12" cy={34 + i * 11} rx="5" ry="9" fill="currentColor" transform={`rotate(-28 12 ${34 + i * 11})`} />
          <ellipse cx="28" cy={34 + i * 11} rx="5" ry="9" fill="currentColor" transform={`rotate(28 28 ${34 + i * 11})`} />
        </g>
      ))}
      <ellipse cx="20" cy="20" rx="5" ry="11" fill="currentColor" />
    </svg>
  );
}

export function OvenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M6 44 V22 a18 18 0 0 1 36 0 V44 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 44 V26 a10 10 0 0 1 20 0 V44 Z" fill="currentColor" opacity=".25" />
      <path d="M24 40 c-5 0 -7 -4 -5 -8 c1 -2 3 -3 3 -6 c4 2 8 6 7 10 c0 2 -2 4 -5 4 Z" fill="currentColor" />
    </svg>
  );
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 660"
      className={className}
      role="img"
      aria-label="Illustration: a scored sourdough loaf, a croissant and a seeded batard on the counter in front of a kiln arch, with a kestrel flying across a sunrise over wheat fields."
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E2BD7C" />
          <stop offset="0.55" stopColor="#F1D9A8" />
          <stop offset="1" stopColor="#F1E8D9" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FAF7F1" stopOpacity="1" />
          <stop offset="0.45" stopColor="#FAF7F1" stopOpacity=".9" />
          <stop offset="1" stopColor="#FAF7F1" stopOpacity="0" />
        </radialGradient>
        <clipPath id="hero-arch">
          <path d="M50 560 V270 a250 250 0 0 1 500 0 V560 Z" />
        </clipPath>
      </defs>

      <path d="M50 560 V270 a250 250 0 0 1 500 0 V560 Z" fill="url(#hero-sky)" />
      <g clipPath="url(#hero-arch)">
        <circle cx="395" cy="250" r="190" fill="url(#hero-sun)" opacity=".9" />
        <circle cx="395" cy="250" r="62" fill="#FAF7F1" />
        <g stroke="#FAF7F1" strokeWidth="3" opacity=".5" strokeLinecap="round">
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return <line key={i} x1={395 + Math.cos(a) * 82} y1={250 + Math.sin(a) * 82} x2={395 + Math.cos(a) * 150} y2={250 + Math.sin(a) * 150} />;
          })}
        </g>
        <path d="M0 420 C90 380 170 410 260 392 C360 372 440 400 600 372 V600 H0 Z" fill="#C9965A" opacity=".55" />
        <path d="M0 456 C110 424 200 452 300 436 C400 420 480 448 600 430 V600 H0 Z" fill="#A76549" opacity=".75" />
        <path d="M0 492 C120 468 220 494 320 480 C420 466 500 488 600 476 V600 H0 Z" fill="#7A431F" opacity=".85" />
        <g stroke="#27221E" strokeWidth="2" opacity=".35">
          {Array.from({ length: 26 }).map((_, i) => (
            <path key={i} d={`M${20 + i * 22} 520 q${i % 2 ? 4 : -4} -22 ${i % 3 === 0 ? 8 : -6} -44`} fill="none" />
          ))}
        </g>
        <g fill="#27221E" transform="translate(150 118) rotate(-8) scale(1.7)">
          <path d={KESTREL_PATH} />
        </g>
      </g>
      <path d="M50 560 V270 a250 250 0 0 1 500 0 V560" fill="none" stroke="#27221E" strokeWidth="7" />
      <path d="M72 560 V272 a228 228 0 0 1 456 0 V560" fill="none" stroke="#27221E" strokeWidth="2" opacity=".35" />

      <rect x="0" y="552" width="600" height="108" fill="#27221E" />
      <rect x="0" y="552" width="600" height="10" fill="#B26B30" />
      <rect x="0" y="562" width="600" height="3" fill="#000" opacity=".25" />

      <ArtUse kind="croissant" x={34} y={432} width={156} height={140} />
      <ArtUse kind="batard" x={404} y={424} width={160} height={144} />
      <ArtUse kind="boule" x={178} y={366} width={240} height={216} />

      <g stroke="#E2BD7C" strokeWidth="2.5" strokeLinecap="round" opacity=".7">
        <path d="M60 612 H190" />
        <path d="M410 612 H540" />
      </g>
    </svg>
  );
}

export function MapArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Stylised illustrative map of the fictional suburb of Wattlebrook, with Kestrel & Kiln marked on Millstone Lane near a creek and a small park."
    >
      <rect width="520" height="600" fill="#F1E8D9" />
      <path d="M-10 430 C80 400 150 460 240 430 C330 400 410 450 530 410 V480 C410 520 330 470 240 500 C150 530 90 480 -10 500 Z" fill="#CFDCCB" />
      <rect x="250" y="60" width="170" height="120" rx="20" fill="#D8DDB8" />
      <g stroke="#FAF7F1" strokeLinecap="round" fill="none">
        <path d="M-10 300 H530" strokeWidth="24" />
        <path d="M170 -10 V610" strokeWidth="20" />
        <path d="M430 -10 V610" strokeWidth="14" />
        <path d="M-10 220 H430" strokeWidth="10" />
        <path d="M-10 560 H170" strokeWidth="10" />
        <path d="M430 340 L530 250" strokeWidth="10" />
        <path d="M60 -10 V300" strokeWidth="8" />
      </g>
      <g stroke="#D9C9AE" strokeWidth="2" strokeDasharray="6 8" fill="none">
        <path d="M-10 300 H530" />
        <path d="M170 -10 V610" />
      </g>
      <g fontFamily="var(--font-body), sans-serif" fontSize="14" fill="#5A4E44" fontWeight="500">
        <text x="196" y="292">Millstone Lane</text>
        <text x="266" y="130">Wattle Green</text>
        <text x="190" y="212">Rye Road</text>
        <text x="190" y="544">Kiln Street</text>
      </g>
      <g transform="translate(170 300)">
        <circle r="30" fill="#A76549" opacity=".22" />
        <path d="M0 8 C-14 -8 -14 -26 0 -26 C14 -26 14 -8 0 8 Z" transform="translate(0 -4) scale(1.25)" fill="#27221E" />
        <circle cy="-30" r="5.5" fill="#E2BD7C" />
      </g>
    </svg>
  );
}

export function StaticSvg({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
