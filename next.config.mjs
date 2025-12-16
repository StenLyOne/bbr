
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bbrgroup.net', pathname: '/**' },
      { protocol: 'https', hostname: 'www.gobiz.click', pathname: '/**' },
      { protocol: 'https', hostname: 'gobiz.click', pathname: '/**' },
    ],
  },
};

export default nextConfig;
