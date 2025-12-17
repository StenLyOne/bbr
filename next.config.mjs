const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bbrgroup.net", pathname: "/**" },
      { protocol: "https", hostname: "www.gobiz.click", pathname: "/**" },
      { protocol: "https", hostname: "gobiz.click", pathname: "/**" },
    ],
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
