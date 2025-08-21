// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bbrgroup.net', pathname: '/**' },
    ],
  },
};

export default nextConfig;
