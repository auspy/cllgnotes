import ExploreHero from "@/components/explore/hero/ExploreHero";
import Suggestions from "@/components/explore/suggestions/Suggestions";
import Footer from "@/components/footer/Footer";
import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { FilterSidebar, List, ListItem, MovingBanner, ToolBar } from "ui";

const page = () => {
  return (
    <div className="fcc w100">
      <ExploreHero />
      <MovingBanner
        text="notes  📖  question papers 📝 presentations 📖 notes  📖  question papers notes  📖  question papers 📝 presentations 📖 notes  📖  question papers"
        textType="h3e"
      />
      {/* BELOW HERO */}
      <div
        className="topContainer flex flex-col mt40"
        style={{ rowGap: 60, marginBottom: 100 }}
      >
        <Suggestions />
        <div className="frfs w100" style={{ gap: 30 }}>
          <FilterSidebar />
          <div className="w100 fcc" style={{ gap: 25 }}>
            <ToolBar />
            <List id="" data={dummyCardsData()} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
