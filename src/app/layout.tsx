import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE } from "@/lib/bakery";
import { ConceptBar } from "@/components/ConceptBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderProvider } from "@/components/OrderProvider";
import { OrderBar } from "@/components/OrderBar";
import { Reveal } from "@/components/Reveal";
import { ArtSprite } from "@/components/ProductArt";
import "./globals.css";

const display = localFont({
  src: [{ path: "../fonts/Fraunces-opsz.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const displayItalic = localFont({
  src: [{ path: "../fonts/Fraunces-italic.woff2", weight: "100 900", style: "italic" }],
  variable: "--font-display-italic",
  display: "swap",
  preload: false,
});

const body = localFont({
  src: [{ path: "../fonts/DMSans.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kestrel-kiln.offshiftstudio.com.au"),
  title: {
    default: "Kestrel & Kiln — slow-baked bread and pastry, Wattlebrook (concept)",
    template: "%s | Kestrel & Kiln (concept)",
  },
  description: SITE.description,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: "Kestrel & Kiln — an OFF/SHIFT concept",
    description: SITE.description,
    type: "website",
    locale: "en_AU",
  },
};

export const viewport: Viewport = {
  themeColor: "#27221E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${displayItalic.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ArtSprite />
        <ConceptBar />
        <OrderProvider>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <OrderBar />
          <Reveal />
        </OrderProvider>
      </body>
    </html>
  );
}
