import HeroHome from "@/components/home/HeroHome";
import WhatWeSell from "@/components/home/WhatWeSell";
import Benefits from "@/components/home/Benefits";
import { MovingBanner, Header } from "ui";
import {
  dummyBenefits,
  dummyTestimonials,
  dummyTrusted,
  dummyWhatWeSell,
} from "@cllgnotes/lib/dummyData";
import Testimonial from "@/components/testi/Testimonial";
import Trusted from "@/components/home/Trusted";
import Footer from "@/components/footer/Footer";
import FilterDocs from "@/components/home/FilterDocs";

export default function Page(): JSX.Element {
  return (
    <>
      <Header />
      <HeroHome />
      <div className="my-[60px] w100">
        <MovingBanner
          text={
            "notes 📖  question papers  📝  presentations  📖  notes 📖  question papers  📝  presentations 📖  notes 📖  question papers  📝  presentations "
          }
          textType="h1e"
        />
      </div>
      <div className="topContainer">
        <FilterDocs minWidth={305} />
      </div>
      <div
        className="fcc w100"
        style={{
          rowGap: 130,
          marginTop: 60,
        }}
      >
        <WhatWeSell data={dummyWhatWeSell} />
        <div className="mb-[30px] w100 fcc">
          <Benefits data={dummyBenefits} />
        </div>
        <Testimonial data={dummyTestimonials} />
      </div>
      <div className="my-[80px]">
        <Trusted data={dummyTrusted(80)} />
      </div>
      <Footer earnMoney={true} />
    </>
  );
}
