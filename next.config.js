const path = require("path");
const integrationsRedirects = require("./redirects/integrations");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HERMES_BASE_URL: process.env.NEXT_PUBLIC_HERMES_BASE_URL || "https://hermes.tutorcruncher.com",
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "GTM-M6QLN6V3"
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tutorcruncher.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
    @use "src/styles/abstracts.scss" as *;
    `,
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [...integrationsRedirects];
  },
};

module.exports = nextConfig;
