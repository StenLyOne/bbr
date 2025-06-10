"use client";

import Footer from "../../../components/sections/Footer";
import Header from "../../../components/sections/Header";


export default function PrivacyPolicy() {

  return (
    <div
      className={`transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden`}
    >
      <Header />
      <section className="p-[16p] p-[40px] my-[200px] text-blue">
        <h1>PRIVACY POLICY</h1>
        <p>
          BBR Agency Pty Ltd (ABN 93 121 083 805), including its associated
          entities BBR Group Events PR Digital (ABN 93 121 083 805) and BBR
          Group Australia (ABN 93 121 083 805), collectively referred to as “BBR
          Group,” is committed to protecting your privacy and ensuring
          compliance with applicable privacy laws and regulations.
        </p>
      </section>
      <Footer />
    </div>
  );
}
