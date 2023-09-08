import { Borders, TrustedProps } from "@cllgnotes/types";
import Image from "next/image";
import { Text } from "ui";

const Trusted = ({ data }: TrustedProps) => {
  return (
    <div className="w100 fcc">
      <Text type="h3" textTransform="uppercase">
        Trusted by students at
      </Text>
      <div
        className="w100 frc mt-[25px]"
        style={{
          overflow: "hidden",
          columnGap: 60,
          borderBlock: Borders.dark,
          paddingBlock: "0.7%",
          paddingInline: 35,
        }}
      >
        {/* todo for some reason images are not proper. fix this. height is not accurate */}
        {data.map(({ src, alt, ...rest }, i) => (
          //   <div
          //     className="rPosi"
          //     key={i + alt}
          //     style={{
          //       ...(rest as React.CSSProperties),
          //     }}
          //   >
          <Image className="frc" {...rest} src={src} alt={alt} />
          //   </div>
        ))}
      </div>
    </div>
  );
};

export default Trusted;
