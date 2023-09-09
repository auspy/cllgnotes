import { Button, SearchBar, ChevronRightRounded } from "ui";
import { ButtonFontSizes } from "@cllgnotes/types/types.buttons";
import HeroText from "./HeroText";

const HeroHome = () => {
  return (
    <div
      className="topContainer rPosi"
      style={{ height: "min(900px,max(660px,76vh))" || 660, display: "flex" }}
    >
      <HeroText
        img={{
          src: "/images/hero.png",
          alt: "notebook illustration",
          height: 450,
          width: 701,
        }}
        text={
          <>
            Notes & papers
            <br /> tailored to your
          </>
        }
        desc="Your One-Stop Store for Notes, Presentations, and Question Papers, All Tailored to Your College Syllabus. This is where accessibility meets knowledge."
        highlightText="college syllabus."
        element={
          <>
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
          </>
        }
      />
    </div>
  );
};

export default HeroHome;
