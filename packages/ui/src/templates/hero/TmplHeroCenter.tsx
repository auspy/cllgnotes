import { ImgProps } from "@cllgnotes/types";
import Image from "next/image";
import { Text, TmplHero } from "ui";
type TmplHeroCenterProps = {
  img: ImgProps;
  heading: string;
  isLeft?: boolean;
  style?: React.CSSProperties;
};
const TmplHeroCenter = ({
  img,
  heading,
  isLeft = true,
  style,
}: TmplHeroCenterProps) => {
  return (
    <>
      <TmplHero
        centerElement={
          <div className="frc" style={style}>
            {isLeft && <Image {...img} />}
            <Text type="h1" textStyle={{ maxWidth: 305 }}>
              {heading}
            </Text>
            {!isLeft && <Image {...img} />}
          </div>
        }
      />
    </>
  );
};

export default TmplHeroCenter;
