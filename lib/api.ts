export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN!;

export interface SiteLogos {
  logo: string;
  favicon: string;
}

export async function fetchSiteLogos(): Promise<SiteLogos> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/generalinfo`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch site logos: ${res.status}`);
  }
  const json = await res.json();
  const logos = json.acf?.site_logos || {};
  return {
    logo: logos.logo ?? "",
    favicon: logos.favicon ?? "/favicon.ico", // fallback na default
  };
}
