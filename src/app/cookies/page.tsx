// src/app/cookies/page.tsx
import Header from "../../../components/sections/Header";
import Footer from "../../../components/sections/Footer";
import { fetchCookiesContent } from "../../../lib/api";

export const dynamic = "force-dynamic";

export default async function CookiesPage() {
  const { title_cookies, description_cookies } = await fetchCookiesContent();

  return (
    <div className="transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden">
      <Header />
      <section className="p-[16px] md:p-[40px] mb-[100px] text-blue">
        <h2 className="md:pt-[132px] pt-[100px] pb-[50px] md:pb-[50px] text-blue">
          {title_cookies}
        </h2>
        <div
          className="prose text-blue"
          dangerouslySetInnerHTML={{ __html: description_cookies }}
        />
      </section>
      <Footer />
    </div>
  );
}
