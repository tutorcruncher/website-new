import "../../styles/globals.scss";

import { TrackingProvider } from "app/providers/tracking-provider";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mnd5til.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <TrackingProvider>
        <body>{children}</body>
      </TrackingProvider>
    </html>
  );
}
