/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["supermomos-app-resources-us.s3.amazonaws.com"],
  },

  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

module.exports = nextConfig;
