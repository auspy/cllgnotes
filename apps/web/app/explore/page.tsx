import BelowHeroExplore from "@/components/explore/BelowHeroExplore";
import ExploreHero from "@/components/explore/hero/ExploreHero";
import Footer from "@/components/footer/Footer";
import { MovingBanner } from "ui";

const page = () => {
  return (
    <div className="fcc w100">
      <ExploreHero />
      <MovingBanner
        text="notes  📖  question papers 📝 presentations 📖 "
        repeat={6}
        textType="h3e"
      />
      {/* BELOW HERO */}
      <BelowHeroExplore />
      <Footer />
    </div>
  );
};

export default page;
