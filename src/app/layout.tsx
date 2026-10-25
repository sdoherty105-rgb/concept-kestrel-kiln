import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/bakery";
import { ConceptBar } from "@/components/ConceptBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderProvider } from "@/components/OrderProvider";
import { OrderBar } from "@/components/OrderBar";
import { Reveal } from "@/components/Reveal";
import { ART } from "@/generated/art";
import "./globals.css";

const FONT_LOADER =
  "var d=document.documentElement;d.classList.add('js');addEventListener('load',function(){setTimeout(function(){d.classList.add('fonts-display','fonts-body')},2600)})";

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
    <html lang="en-AU">
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_LOADER }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
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
        <div
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: ART.sprite }}
        />
      </body>
    </html>
  );
}
