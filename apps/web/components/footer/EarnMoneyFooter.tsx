import Colors from "@cllgnotes/types/colors";
import HeroText from "../home/HeroText";
import EarnMoneyForm from "./EarnMoneyForm";
import { AnimateWrapper } from "ui";

const EarnMoneyFooter = ({
  containerStyle,
  containerClass,
}: {
  containerStyle?: React.CSSProperties;
  containerClass?: string;
}) => {
  return (
    <>
      <AnimateWrapper elementId="earnFooter" animation="earnFooterAnim" />
      <div
        className={`earnFooter topContainer ${containerClass}`}
        style={{ ...containerStyle }}
      >
        <div
          className="rPosi h-auto b lg:h-[660px] p-5 sm:p-7"
          style={{
            display: "flex",
            backgroundColor: Colors.lGrey2,
          }}
        >
          <HeroText
            desc="We will allow users to upload their notes and presentations and earn money on them if we reach 1001 votes."
            text={
              <>
                Want to upload
                <br /> your notes and
              </>
            }
            highlightText="earn money?"
            element={<EarnMoneyForm />}
            img={{
              src: "/images/earn.png",
              alt: "earn money",
              height: 361,
              width: 579,
            }}
            // imgStyles={{ bottom: "unset", top: 55, right: 30 }}
            descMaxWidth={441}
            color="green"
          />
        </div>
      </div>
    </>
  );
};

export default EarnMoneyFooter;
