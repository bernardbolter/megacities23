/** @type {import('next').NextConfig} */

// const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["thefilterman.de"],
  },
  i18n: {
    locales: ["en", "de", "cn"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
