/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gobiz.click',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
