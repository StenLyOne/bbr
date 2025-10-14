// src/app/privacy-policy/page.tsx
import Header from "../../../components/sections/Header";
import Footer from "../../../components/sections/Footer/index";
import { fetchPrivacyContent } from "../../../lib/api/privacy";

export const revalidate = 60;

export default async function PrivacyPolicyPage() {
  const { title_privacy, description_privacy } = await fetchPrivacyContent();

  return (
    <div className="transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden">
      <Header />
      <section className="p-[16px] md:p-[40px] mb-[100px] text-blue">
        <h2 className="md:pt-[132px] pt-[100px] pb-[50px] md:pb-[50px] text-blue">
          {title_privacy}
        </h2>
        <div
          className="prose text-blue"
          dangerouslySetInnerHTML={{ __html: description_privacy }}
        />
      </section>
      <Footer />
    </div>
  );
}
