import "../styles/globals.scss";

import { Inter } from "next/font/google";

import AnimateObserver from "@/components/AnimateObserver";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mnd5til.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      {/* <GoogleTagManager gtmId="GTM-K7CNPB" /> */}
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <AnimateObserver />
      </body>
    </html>
  );
}
