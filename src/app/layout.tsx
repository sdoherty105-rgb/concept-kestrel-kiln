import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/bakery";
import { ConceptBar } from "@/components/ConceptBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderProvider } from "@/components/OrderProvider";
import { OrderBar } from "@/components/OrderBar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kestrel-kiln.offshiftstudio.com.au"),
  title: {
    default: "Kestrel & Kiln — one bake at a time, Wattlebrook (concept)",
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
  themeColor: "#F2E2C0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preload" href="/fonts/CaveatBrush.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Bitter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ConceptBar />
        <OrderProvider>
          <Header />
          <main id="main" tabIndex={-1} data-unit="plate">
            {children}
          </main>
          <OrderBar />
        </OrderProvider>
        <Footer />
      </body>
    </html>
  );
}
