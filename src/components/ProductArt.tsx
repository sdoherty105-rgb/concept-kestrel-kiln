import type { ArtKind } from "@/lib/bakery";

const C = {
  crustDark: "#7A431F",
  crust: "#B26B30",
  crustLight: "#D9944A",
  glow: "#EDB96A",
  crumb: "#F4E2BB",
  flour: "#FAF7F1",
  espresso: "#27221E",
  terracotta: "#A76549",
  olive: "#5C6A3B",
};

function Shadow({ cx = 100, cy = 168, rx = 72, ry = 9 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.espresso} opacity={0.14} />;
}

function Dust({ pts }: { pts: [number, number, number][] }) {
  return (
    <g fill={C.flour} opacity={0.85}>
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}


function Croissant({ id, almond = false }: { id: string; almond?: boolean }) {
  const body = `${id}-body`;
  return (
    <g>
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0BE6C" />
          <stop offset="0.55" stopColor={C.crustLight} />
          <stop offset="1" stopColor={C.crust} />
        </linearGradient>
      </defs>
      <Shadow rx={74} />
      <g fill={`url(#${body})`} stroke={C.crustDark} strokeWidth="1.8" strokeOpacity=".55">
        <ellipse cx="44" cy="124" rx="17" ry="11" transform="rotate(-62 44 124)" />
        <ellipse cx="156" cy="124" rx="17" ry="11" transform="rotate(62 156 124)" />
        <ellipse cx="58" cy="98" rx="24" ry="17" transform="rotate(-38 58 98)" />
        <ellipse cx="142" cy="98" rx="24" ry="17" transform="rotate(38 142 98)" />
        <ellipse cx="100" cy="86" rx="30" ry="24" />
      </g>
      <g stroke={C.crustDark} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".5">
        <path d="M82 70 C92 82 92 96 84 106" />
        <path d="M118 70 C108 82 108 96 116 106" />
        <path d="M46 88 C54 98 54 108 50 114" />
        <path d="M154 88 C146 98 146 108 150 114" />
      </g>
      <path d="M82 70 C92 62 108 62 118 70" fill="none" stroke={C.flour} strokeWidth="3" strokeLinecap="round" opacity=".55" />
      {almond && (
        <g>
          <path d="M70 84 C84 70 116 70 130 84 C132 92 120 90 100 90 C80 90 68 92 70 84 Z" fill={C.flour} opacity=".8" />
          <g fill="#E9CC96" stroke={C.crustDark} strokeWidth=".8" strokeOpacity=".5">
            {[[78, 80, -30], [92, 74, 10], [106, 73, -12], [120, 78, 24], [98, 84, 40], [84, 90, -50], [114, 88, 5], [60, 100, -40], [140, 102, 38], [48, 122, -20], [152, 122, 20]].map(([x, y, r], i) => (
              <path key={i} d="M-6 0 C-3 -4 3 -4 6 0 C3 4 -3 4 -6 0 Z" transform={`translate(${x} ${y}) rotate(${r})`} />
            ))}
          </g>
        </g>
      )}
    </g>
  );
}

function Art({ kind, id }: { kind: ArtKind; id: string }) {
  const body = `${id}-body`;
  switch (kind) {
    case "boule":
      return (
        <g>
          <defs>
            <radialGradient id={body} cx="40%" cy="30%" r="80%">
              <stop offset="0" stopColor={C.glow} />
              <stop offset="0.55" stopColor={C.crust} />
              <stop offset="1" stopColor={C.crustDark} />
            </radialGradient>
          </defs>
          <Shadow />
          <ellipse cx="100" cy="110" rx="74" ry="58" fill={`url(#${body})`} />
          <path d="M58 92 C84 66 128 64 148 94" fill="none" stroke={C.crumb} strokeWidth="9" strokeLinecap="round" />
          <path d="M62 100 C88 80 126 78 144 102" fill="none" stroke={C.crustDark} strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
          <path d="M72 128 C92 138 118 138 134 124" fill="none" stroke={C.crustDark} strokeWidth="2" strokeLinecap="round" opacity=".35" />
          <Dust pts={[[70, 88, 1.8], [82, 76, 1.4], [112, 72, 1.8], [128, 80, 1.4], [138, 96, 1.6], [96, 70, 1.2], [60, 104, 1.4]]} />
        </g>
      );
    case "rye":
      return (
        <g>
          <defs>
            <radialGradient id={body} cx="40%" cy="30%" r="85%">
              <stop offset="0" stopColor="#8E5528" />
              <stop offset="0.6" stopColor="#5E3519" />
              <stop offset="1" stopColor="#3A2010" />
            </radialGradient>
          </defs>
          <Shadow />
          <ellipse cx="100" cy="112" rx="76" ry="52" fill={`url(#${body})`} />
          <g stroke={C.glow} strokeWidth="2.6" strokeLinecap="round" opacity=".7">
            <path d="M62 96 L94 76" />
            <path d="M76 110 L116 84" />
            <path d="M94 124 L136 98" />
            <path d="M62 120 L100 96" opacity=".6" />
            <path d="M116 126 L146 108" opacity=".6" />
            <path d="M80 80 L112 100" opacity=".0" />
          </g>
          <g fill={C.crumb}>
            {[[70, 112], [84, 94], [108, 106], [124, 120], [140, 100], [98, 84], [66, 126], [112, 130], [130, 88]].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="3" ry="1.4" transform={`rotate(${i * 37} ${x} ${y})`} />
            ))}
          </g>
        </g>
      );
    case "batard":
      return (
        <g>
          <defs>
            <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C.crustLight} />
              <stop offset="0.6" stopColor={C.crust} />
              <stop offset="1" stopColor={C.crustDark} />
            </linearGradient>
          </defs>
          <Shadow rx={84} />
          <g transform="rotate(-10 100 108)">
            <ellipse cx="100" cy="110" rx="88" ry="40" fill={`url(#${body})`} />
            <g stroke={C.crumb} strokeWidth="7" strokeLinecap="round">
              <path d="M52 100 L72 86" />
              <path d="M82 96 L104 80" />
              <path d="M114 96 L136 82" />
            </g>
            <g fill={C.espresso} opacity=".55">
              {[[58, 120], [74, 124], [92, 118], [110, 124], [128, 118], [144, 112], [66, 106], [100, 108], [122, 106]].map(([x, y], i) => (
                <ellipse key={i} cx={x} cy={y} rx="2.6" ry="1.3" transform={`rotate(${i * 29} ${x} ${y})`} />
              ))}
            </g>
            <g fill={C.crumb}>
              {[[64, 130], [86, 132], [106, 134], [126, 130], [48, 112], [150, 122]].map(([x, y], i) => (
                <ellipse key={i} cx={x} cy={y} rx="2.6" ry="1.3" transform={`rotate(${i * 51} ${x} ${y})`} />
              ))}
            </g>
          </g>
        </g>
      );
    case "tin":
      return (
        <g>
          <defs>
            <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C.glow} />
              <stop offset="1" stopColor={C.crust} />
            </linearGradient>
          </defs>
          <Shadow rx={70} />
          <path d="M42 84 C34 52 74 46 100 50 C126 46 166 52 158 84 Z" fill={`url(#${body})`} />
          <rect x="42" y="82" width="116" height="74" rx="8" fill="#6C5B4C" />
          <rect x="42" y="82" width="116" height="10" fill="#857262" />
          <path d="M42 156 H158" stroke={C.espresso} strokeWidth="3" opacity=".3" />
          <g fill={C.crumb} opacity=".9">
            {[[78, 64], [96, 60], [116, 63], [132, 68], [64, 70], [104, 70]].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="3.4" ry="1.7" transform={`rotate(${i * 41} ${x} ${y})`} />
            ))}
          </g>
          <path d="M52 100 V146" stroke={C.flour} strokeWidth="3" strokeLinecap="round" opacity=".18" />
        </g>
      );
    case "focaccia":
      return (
        <g>
          <defs>
            <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F0C275" />
              <stop offset="1" stopColor={C.crustLight} />
            </linearGradient>
          </defs>
          <Shadow rx={78} />
          <rect x="30" y="60" width="140" height="100" rx="14" fill={C.crustDark} opacity=".5" transform="translate(0 5)" />
          <rect x="30" y="56" width="140" height="100" rx="14" fill={`url(#${body})`} />
          <g fill={C.crust} opacity=".6">
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={i} cx={52 + (i % 5) * 24 + (Math.floor(i / 5) % 2) * 8} cy={80 + Math.floor(i / 5) * 28} r="4.5" />
            ))}
          </g>
          <g stroke={C.olive} strokeWidth="2.4" strokeLinecap="round">
            <path d="M58 70 l12 -6" />
            <path d="M108 128 l14 -5" />
            <path d="M138 80 l-12 -7" />
            <path d="M74 138 l-10 -8" />
            <path d="M96 94 l10 6" />
          </g>
          <Dust pts={[[50, 66, 1.8], [90, 70, 1.6], [128, 66, 1.8], [150, 100, 1.6], [64, 112, 1.6], [100, 112, 1.8], [148, 138, 1.6], [86, 144, 1.6], [120, 146, 1.4], [44, 130, 1.6]]} />
        </g>
      );
    case "croissant":
      return <Croissant id={id} />;
    case "almond":
      return <Croissant id={id} almond />;
    case "bun":
      return (
        <g>
          <defs>
            <radialGradient id={body} cx="38%" cy="30%" r="80%">
              <stop offset="0" stopColor="#F0C070" />
              <stop offset="0.6" stopColor={C.crustLight} />
              <stop offset="1" stopColor={C.crust} />
            </radialGradient>
          </defs>
          <Shadow rx={66} />
          <circle cx="100" cy="108" r="58" fill={`url(#${body})`} />
          <path
            d="M100 108 m0 0 c10 -4 18 4 14 14 c-5 12 -22 12 -30 2 c-9 -12 -2 -32 14 -38 c20 -7 42 6 44 28 c2 24 -22 42 -46 38"
            fill="none"
            stroke={C.crustDark}
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".5"
          />
          <path
            d="M100 108 m0 0 c10 -4 18 4 14 14 c-5 12 -22 12 -30 2 c-9 -12 -2 -32 14 -38 c20 -7 42 6 44 28 c2 24 -22 42 -46 38"
            fill="none"
            stroke="#F5CC84"
            strokeWidth="1.6"
            strokeLinecap="round"
            transform="translate(2 -3)"
          />
          <ellipse cx="78" cy="78" rx="14" ry="6" fill={C.flour} opacity=".4" transform="rotate(-30 78 78)" />
          <g fill={C.crumb}>
            {[[66, 120], [134, 92], [118, 144], [84, 140], [136, 124]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" />
            ))}
          </g>
        </g>
      );
    case "kouign":
      return (
        <g>
          <defs>
            <radialGradient id={body} cx="40%" cy="30%" r="85%">
              <stop offset="0" stopColor="#EBA956" />
              <stop offset="0.6" stopColor="#B96B2A" />
              <stop offset="1" stopColor="#6E3A19" />
            </radialGradient>
          </defs>
          <Shadow rx={66} />
          <g fill={`url(#${body})`} stroke="#5E3015" strokeWidth="1.8" strokeOpacity=".55">
            <ellipse cx="100" cy="72" rx="26" ry="38" transform="rotate(0 100 106)" />
            <ellipse cx="100" cy="72" rx="26" ry="38" transform="rotate(90 100 106)" />
            <ellipse cx="100" cy="72" rx="26" ry="38" transform="rotate(180 100 106)" />
            <ellipse cx="100" cy="72" rx="26" ry="38" transform="rotate(270 100 106)" />
            <ellipse cx="100" cy="72" rx="24" ry="34" transform="rotate(45 100 106)" />
            <ellipse cx="100" cy="72" rx="24" ry="34" transform="rotate(135 100 106)" />
            <ellipse cx="100" cy="72" rx="24" ry="34" transform="rotate(225 100 106)" />
            <ellipse cx="100" cy="72" rx="24" ry="34" transform="rotate(315 100 106)" />
          </g>
          <circle cx="100" cy="106" r="18" fill="#7A431F" />
          <circle cx="100" cy="106" r="10" fill="#E9A24F" opacity=".9" />
          <g fill="none" stroke="#F6D08E" strokeWidth="3" strokeLinecap="round" opacity=".75">
            <path d="M82 66 C90 60 100 58 110 60" />
            <path d="M140 84 C146 92 148 100 146 110" />
            <path d="M118 150 C108 154 96 154 86 150" />
            <path d="M58 128 C54 120 54 110 56 102" />
          </g>
          <Dust pts={[[74, 84, 1.6], [126, 80, 1.6], [136, 128, 1.8], [70, 130, 1.6], [100, 66, 1.4], [100, 148, 1.4], [150, 104, 1.4], [52, 104, 1.4]]} />
        </g>
      );
    case "scroll":
      return (
        <g>
          <defs>
            <radialGradient id={body} cx="40%" cy="30%" r="85%">
              <stop offset="0" stopColor="#F2CE8C" />
              <stop offset="0.7" stopColor="#D9944A" />
              <stop offset="1" stopColor="#B26B30" />
            </radialGradient>
          </defs>
          <Shadow rx={68} />
          <circle cx="100" cy="106" r="60" fill={`url(#${body})`} />
          <path
            d="M100 106 m-3 0 a3 3 0 1 1 3 3 a8 8 0 1 1 -8 -9 a16 16 0 1 1 18 18 a24 24 0 1 1 -28 -28 a32 32 0 1 1 38 38 a40 40 0 1 1 -46 -46"
            fill="none"
            stroke={C.crustDark}
            strokeWidth="4"
            strokeLinecap="round"
            opacity=".5"
          />
          <path
            d="M52 84 C70 70 86 94 104 80 C120 68 136 90 152 78 M46 106 C66 94 84 118 104 104 C124 92 138 114 156 104 M54 130 C72 118 88 142 106 128 C124 116 138 136 150 128"
            fill="none"
            stroke={C.flour}
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".85"
          />
        </g>
      );
    case "danish":
      return (
        <g>
          <defs>
            <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F0C275" />
              <stop offset="1" stopColor={C.crust} />
            </linearGradient>
          </defs>
          <Shadow rx={66} />
          <g transform="rotate(45 100 106)">
            <rect x="46" y="52" width="108" height="108" rx="12" fill={`url(#${body})`} />
            <rect x="60" y="66" width="80" height="80" rx="8" fill="none" stroke={C.crustDark} strokeWidth="2" opacity=".35" />
          </g>
          <circle cx="100" cy="106" r="30" fill="#F6E7B8" />
          <circle cx="100" cy="106" r="30" fill="none" stroke={C.crust} strokeWidth="2" opacity=".5" />
          <g>
            <ellipse cx="90" cy="100" rx="10" ry="7" fill={C.terracotta} transform="rotate(-25 90 100)" />
            <ellipse cx="112" cy="104" rx="10" ry="7" fill="#C2543C" transform="rotate(20 112 104)" />
            <ellipse cx="100" cy="118" rx="10" ry="6" fill={C.terracotta} transform="rotate(8 100 118)" />
            <ellipse cx="88" cy="97" rx="3" ry="1.6" fill={C.flour} opacity=".5" transform="rotate(-25 88 97)" />
          </g>
          <Dust pts={[[100, 62, 1.6], [58, 106, 1.6], [142, 106, 1.6], [100, 150, 1.6]]} />
        </g>
      );
  }
}

const KINDS: ArtKind[] = ["boule", "batard", "tin", "rye", "croissant", "almond", "bun", "kouign", "danish", "scroll", "focaccia"];

export function ArtSprite() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      {KINDS.map((k) => (
        <symbol key={k} id={`art-${k}`} viewBox="0 0 200 180">
          <Art kind={k} id={`g-${k}`} />
        </symbol>
      ))}
    </svg>
  );
}

export function ArtUse({ kind, x = 0, y = 0, width = 200, height = 180 }: { kind: ArtKind; x?: number; y?: number; width?: number; height?: number }) {
  return <use href={`#art-${kind}`} x={x} y={y} width={width} height={height} />;
}

export function ProductArt({ kind, className }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 180" className={className} role="presentation" aria-hidden="true" focusable="false">
      <use href={`#art-${kind}`} width="200" height="180" />
    </svg>
  );
}
