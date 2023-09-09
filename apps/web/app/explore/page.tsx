import ExploreHero from "@/components/explore/hero/ExploreHero";
import Suggestions from "@/components/explore/suggestions/Suggestions";
import { MovingBanner } from "ui";

const page = () => {
  return (
    <div className="fcc w100">
      <ExploreHero />
      <MovingBanner
        text="notes  📖  question papers 📝 presentations 📖 notes  📖  question papers notes  📖  question papers 📝 presentations 📖 notes  📖  question papers"
        textType="h3e"
      />
      {/* BELOW HERO */}
      <div className="topContainer mt40" style={{ gap: 60 }}>
        <Suggestions />
      </div>
    </div>
  );
};

export default page;
