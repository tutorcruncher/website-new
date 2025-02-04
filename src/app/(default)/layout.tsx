import "../../styles/globals.scss";

import { Inter } from "next/font/google";

import AnimateObserver from "@/components/AnimateObserver";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { TrackingProvider } from "../providers/tracking-provider";
import IntercomClientComponent from "@/components/intercom/intercom";
import CookieConsentBanner from "@/components/cookie-consent-banner";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mnd5til.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <body>
        <TrackingProvider>
          <CookieConsentBanner />
          <Header />
          <main>{children}</main>
          <Footer />
          <AnimateObserver />
          <IntercomClientComponent />
        </TrackingProvider>
      </body>
    </html>
  );
}
