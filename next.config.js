/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "alhidaya.local",
      "sa.local",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
    // unoptimized: true,
  },
};

module.exports = nextConfig;
