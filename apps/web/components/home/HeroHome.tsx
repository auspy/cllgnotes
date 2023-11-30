import { SearchBar } from "ui";
import HeroText from "./HeroText";

const HeroHome = () => {
  return (
    <div className="lineBg">
      <div
        id="heroHome"
        className="topContainer rPosi"
        style={{ height: "min(860px,max(660px,76vh))" || 660, display: "flex" }}
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
                exploreBtn={true}
              />
            </>
          }
        />
      </div>
    </div>
  );
};

export default HeroHome;
