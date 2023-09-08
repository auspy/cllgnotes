import Header from "@/components/header/Header";
import HeroHome from "@/components/home/HeroHome";
import WhatWeSell from "@/components/home/WhatWeSell";
import { MovingBanner } from "ui";
import { dummyWhatWeSell } from "@cllgnotes/lib/dummyData";
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
        className="fcc"
        style={{
          rowGap: 100,
        }}
      ></div>
      <WhatWeSell data={dummyWhatWeSell} />
    </>
  );
}
