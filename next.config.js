/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_LEADS_API_KEY: process.env.FIREBASE_LEADS_API_KEY,
    FIREBASE_LEADS_AUTH_DOMAIN: process.env.FIREBASE_LEADS_AUTH_DOMAIN,
    FIREBASE_LEADS_PROJECT_ID: process.env.FIREBASE_LEADS_PROJECT_ID,
    FIREBASE_LEADS_STORAGE_BUCKET: process.env.FIREBASE_LEADS_STORAGE_BUCKET,
    FIREBASE_LEADS_MESSAGING_SENDER_ID:
      process.env.FIREBASE_LEADS_MESSAGING_SENDER_ID,
    FIREBASE_LEADS_APP_ID: process.env.FIREBASE_LEADS_APP_ID,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
  experimental: { appDir: true },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    images: {
      dangerouslyAllowSVG: true,
    },
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        /*port: "",
        pathname: "/v0/b/publicly-app.appspot.com/o/**",*/
      },
    ],
  },
};

module.exports = withPlausibleProxy()(nextConfig);
