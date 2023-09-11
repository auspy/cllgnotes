import Footer from "@/components/footer/Footer";
import NotesHero from "@/components/notes/NotesHero";
import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { CardGrp, MovingBanner, PreviewPdf } from "ui";

const page = () => {
  return (
    <>
      <NotesHero />
      <div className="topContainer mt40 mb-[100px] fcfs">
        <PreviewPdf />
      </div>
      <MovingBanner
        textType="h1e"
        text="🥰 You might also like 🥰 You might also like 😍 You might also like 😍"
      />
      <div className="topContainer mt30 mb-[100px]">
        <CardGrp id="idcards" data={dummyCardsData()} />
      </div>
      <Footer earnMoney={true} />
    </>
  );
};

export default page;
