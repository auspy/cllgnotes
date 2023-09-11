import Colors from "@cllgnotes/types/colors";
import Image from "next/image";
import { SearchBar, Text, Header } from "ui";
const ExploreHero = ({
  heading = "Explore documents",
}: {
  heading?: string;
}) => {
  return (
    <div
      className="w100 fcc"
      style={{
        backgroundColor: Colors.lGrey,
        height: "min(700px,max(422px,50vh))",
      }}
    >
      <Header />
      <div className="frfesb topContainer" style={{ height: "100%" }}>
        <div
          className="fcfs w100 xl:w-auto "
          style={{ gap: 30, paddingBottom: 43 }}
        >
          <Text type="h1">{heading}</Text>
          <SearchBar
            options={["SRM Haryana", "Ashoke University"]}
            height={60}
          />
        </div>
        <div
          className="w100 hidden lg:grid "
          style={{
            maxWidth: 629,
            height: 229,
          }}
        >
          <div
            style={{ alignSelf: "flex-end", justifySelf: "center" }}
            className="rPosi hidden lg:block lg:w-[483px] lg:h-4/5 xl:h-full xl:w-full "
          >
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={"/images/explore.png"}
              alt="notes"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHero;
