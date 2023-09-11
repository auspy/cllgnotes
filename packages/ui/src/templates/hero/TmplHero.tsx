import { Header, MovingBanner } from "ui";
import Colors from "@cllgnotes/types/colors";
type TmplHeroProps = React.PropsWithChildren & {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
};
const TmplHero = ({ leftElement, rightElement, children }: TmplHeroProps) => {
  return (
    <>
      <div className="fcc w100">
        <div
          className="w100 fcc"
          style={{
            backgroundColor: Colors.lGrey,
            height: "min(700px,max(422px,50vh))",
          }}
        >
          <Header />
          <div className="frfesb topContainer rPosi" style={{ height: "100%" }}>
            <div
              className="fcfs w100 xl:w-auto rPosi"
              style={{ gap: 30, paddingBottom: 43 }}
            >
              {leftElement}
            </div>
            {rightElement}
          </div>
        </div>
        <MovingBanner
          text="notes  📖  question papers 📝 presentations 📖 notes  📖  question papers notes  📖  question papers 📝 presentations 📖 notes  📖  question papers"
          textType="h3e"
        />
        {children}
      </div>
    </>
  );
};

export default TmplHero;
