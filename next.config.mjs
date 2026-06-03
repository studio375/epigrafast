/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "admin.epigrafast.com",
        pathname: "/wp-content/uploads/**", // This is for WP
      },
    ],
  },
};

export default nextConfig;
