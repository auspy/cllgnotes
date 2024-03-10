import Footer from "@/components/footer/Footer";
import { TmplHeroCenter } from "ui";
import LearningsData from "./LearningsData";

const page = () => {
  return (
    <div className="w100 fcc ">
      <TmplHeroCenter
        style={{ transform: "translateX(-70px)" }}
        heading="My Learnings"
        img={{
          src: "/images/learning.png",
          alt: "learning",
          height: 204,
          width: 332,
          style: {
            position: "relative",
            right: "-145px",
            top: "-30px",
          },
        }}
      />
      {/* @ts-expect-error Server Component */}
      <LearningsData />
      <Footer />
    </div>
  );
};

export default page;
