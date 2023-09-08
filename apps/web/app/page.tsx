import Header from "@/components/header/Header";
import HeroHome from "@/components/home/HeroHome";
import WhatWeSell from "@/components/home/WhatWeSell";
import Benefits from "@/components/home/Benefits";
import { MovingBanner } from "ui";
import {
  dummyBenefits,
  dummyTestimonials,
  dummyTrusted,
  dummyWhatWeSell,
} from "@cllgnotes/lib/dummyData";
import Testimonial from "@/components/testi/Testimonial";
import Trusted from "@/components/home/Trusted";
import Footer from "@/components/footer/Footer";

export default function Page(): JSX.Element {
  return (
    <>
      <Header />
      <HeroHome />
      <div className="my-[60px] w100">
        <MovingBanner
          text={
            "notes 📖  question papers  📝  presentations  📖  question papers"
          }
          textType="h1e"
        />
      </div>
      <div
        className="fcc w100"
        style={{
          rowGap: 100,
        }}
      >
        <WhatWeSell data={dummyWhatWeSell} />
        <Benefits data={dummyBenefits} />
        <Testimonial data={dummyTestimonials} />
        <Trusted data={dummyTrusted} />
        <Footer earnMoney={true} />
      </div>
    </>
  );
}
