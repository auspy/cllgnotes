import { Button, Heading, SearchBar, Text } from "ui";
import { ButtonFontSizes } from "@cllgnotes/types/types.buttons";
import { HeadingType } from "@cllgnotes/types/types.text";
import Image from "next/image";
import { ChevronRightRounded } from "../mui";

const HeroHome = () => {
  return (
    <div
      className="topContainer rPosi"
      style={{ height: "min(900px,max(660px,76vh))" || 660, display: "flex" }}
    >
      <div
        id="homeHeroImg"
        className="w100 fcc"
        style={{
          maxHeight: 450 || 470,
          maxWidth: 701 || 734,
          height: "inherit",
          position: "absolute",
          right: 0,
          bottom: "32%",
        }}
      >
        <Image
          src={"/images/hero.png"}
          alt="notebook illustration"
          fill
          priority
        />
      </div>
      <div className="w100" style={{ alignSelf: "flex-end" }}>
        <Text
          text="Your One-Stop Store for Notes, Presentations, and Question Papers, All Tailored to Your College Syllabus. This is where accessibility meets knowledge."
          textStyle={{ maxWidth: 669 }}
          type="medi22"
        />
        <Heading
          type={HeadingType.h1}
          headingClass="my-[20px]"
          text={
            <>
              Notes & papers
              <br /> tailored to your
            </>
          }
          highlightText="college syllabus."
        />
        <div className="frcsb w100" style={{ columnGap: 25 }}>
          <SearchBar
            height={90}
            options={["Srm university", "ashoka university"]}
          />
          <Button
            buttonStyles={{ maxWidth: 289 }}
            text="Explore Docs"
            fontSize={ButtonFontSizes.large}
            icon={
              <ChevronRightRounded
                color="inherit"
                sx={{
                  fontSize: 32,
                }}
                style={{ strokeWidth: 5 }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
