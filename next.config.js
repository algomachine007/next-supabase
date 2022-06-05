/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const imageConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = () => {
  return {
    ...imageConfig,
    ...nextConfig,
  };
};
