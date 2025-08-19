"use client";

import Footer from "../../components/sections/Footer";
import Header from "../../components/sections/Header";
import Button from "../../components/ui/buttons/Button";

export default function NotFound() {
  return (
    <div
      className={`transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden`}
    >
      <Header />
      <section className="p-[16px]  py-[200px] text-blue text-center flex flex-col items-center justify-center">
        <h1 className=" text-blue">404</h1>
        <p className="large text-blue pb-[70px] pt-[30px]">
          This page doesn’t exist.br <br />
          Let’s take you to a page that does.
        </p>
        <Button text="Home" color="black" link="/" type="button" arrow={true} />
      </section>
      <Footer />
    </div>
  );
}
