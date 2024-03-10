import MovingBanner from "../../banners/MovingBanner";
import Colors from "@cllgnotes/types/colors";
import Header from "../../header/Header";

type TmplHeroProps = React.PropsWithChildren & { height?: number | string } & (
    | {
        centerElement?: undefined;
        leftElement?: React.ReactNode;
        rightElement?: React.ReactNode;
      }
    | {
        centerElement?: React.ReactNode;
        leftElement?: undefined;
        rightElement?: undefined;
      }
  );
const TmplHero = ({
  leftElement,
  rightElement,
  centerElement,
  children,
  height,
}: TmplHeroProps) => {
  return (
    <>
      <div className="fcc w100">
        <div
          className="w100 fcc"
          style={{
            backgroundColor: Colors.lGrey,
            height: height || "min(700px,max(422px,50vh))",
          }}
        >
          <Header />
          <div className="lineBg">
            <div
              className={`${
                centerElement ? "fccc" : "frfesb"
              } topContainer rPosi`}
              style={{ height: "100%" }}
            >
              {centerElement || (
                <>
                  <div
                    className="fcfs w-0 lg:w-full xl:w-auto rPosi "
                    style={{ gap: 30, paddingBottom: 43 }}
                  >
                    {leftElement}
                  </div>
                  {rightElement}
                </>
              )}
            </div>
          </div>
        </div>
        <MovingBanner
          text="notes  📖  question papers 📝 presentations 📖 notes  📖  question papers"
          textType="h3e"
          repeat={6}
          isLeft={true}
        />
        {children}
      </div>
    </>
  );
};

export default TmplHero;
