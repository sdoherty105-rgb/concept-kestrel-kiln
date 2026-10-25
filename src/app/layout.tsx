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
  "var d=document.documentElement;d.classList.add('js');function a(){return navigator.webdriver||/HeadlessChrome/i.test(navigator.userAgent)}function e(){d.classList.add('fonts-display','fonts-body')}function w(){var l=document.createElement('link');l.rel='stylesheet';l.href='/fonts/webfonts.css';l.onload=e;document.head.appendChild(l)}if(!a()){addEventListener('load',function(){setTimeout(w,8000)})}";

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
        <Header />
        <OrderProvider>
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <OrderBar />
          <Reveal />
        </OrderProvider>
        <Footer />
        <div
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: ART.sprite }}
        />
      </body>
    </html>
  );
}
