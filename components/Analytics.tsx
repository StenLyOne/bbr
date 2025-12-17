"use client";

import Script from "next/script";
import { getConsent } from "../lib/cookiesConsent";

export default function Analytics() {
  const consent = getConsent();

  if (!consent?.analytics) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  `}
      </Script>
    </>
  );
}
