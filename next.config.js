const path = require("path");
const integrationsRedirects = require("./redirects/integrations");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
