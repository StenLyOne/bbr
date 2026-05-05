const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bbr-group.com.au";
const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "";

const STATIC_ROUTES = [
  "/",
  "/events",
  "/pr",
  "/digital",
  "/portfolio",
  "/our-story",
  "/our-owned-events",
  "/team",
  "/contact",
  "/privacy-policy",
  "/cookies",
];

function normalizeSlug(slug) {
  return String(slug ?? "").trim().replace(/^\/+|\/+$/g, "");
}

async function safeFetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[next-sitemap] ${url} -> HTTP ${res.status}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.warn(`[next-sitemap] Failed to fetch ${url}:`, error?.message || error);
    return null;
  }
}

async function getDynamicRoutes() {
  if (!API_DOMAIN) return [];

  const [portfolioTeasers, ownedEvents] = await Promise.all([
    safeFetchJson(`${API_DOMAIN}/wp-json/bbr/v1/portfolio-teasers`),
    safeFetchJson(`${API_DOMAIN}/wp-json/bbr/v1/allevents`),
  ]);

  const dynamicRoutes = [];

  if (Array.isArray(portfolioTeasers)) {
    for (const item of portfolioTeasers) {
      const slug = normalizeSlug(item?.slug);
      if (slug) dynamicRoutes.push(`/portfolio/${encodeURIComponent(slug)}`);
    }
  }

  if (Array.isArray(ownedEvents)) {
    for (const item of ownedEvents) {
      const slug = normalizeSlug(item?.slug);
      if (slug) dynamicRoutes.push(`/our-owned-events/${encodeURIComponent(slug)}`);
    }
  }

  return dynamicRoutes;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  changefreq: "daily",
  priority: 0.7,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    "/api/*",
    "/favicon.ico",
    "/_not-found",
    "/_global-error",
  ],
  additionalPaths: async (config) => {
    const allRoutes = new Set(STATIC_ROUTES);
    const dynamicRoutes = await getDynamicRoutes();

    for (const route of dynamicRoutes) {
      allRoutes.add(route);
    }

    const entries = await Promise.all(
      Array.from(allRoutes).map((route) => config.transform(config, route))
    );

    return entries.filter(Boolean);
  },
};
