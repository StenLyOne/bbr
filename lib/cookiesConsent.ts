export type CookieConsent = {
  necessary: true;
  analytics: boolean;
};

export const CONSENT_KEY = "bbr_cookie_consent";

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  const raw =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(CONSENT_KEY + "="))
      ?.split("=")[1] || localStorage.getItem(CONSENT_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

export function setConsent(consent: CookieConsent) {
  const value = encodeURIComponent(JSON.stringify(consent));

  document.cookie = `${CONSENT_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  localStorage.setItem(CONSENT_KEY, value);
}
