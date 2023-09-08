import Header from "@/components/header/Header";
import HeroHome from "@/components/home/HeroHome";
import { MovingBanner } from "ui";
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
    </>
  );
}
