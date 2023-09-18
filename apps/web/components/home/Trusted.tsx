import { Borders, TrustedProps } from "@cllgnotes/types";
import { Text } from "ui";
import ImageClient from "./Image";

const Trusted = ({ data }: TrustedProps) => {
  return (
    <div className="w100 fcc">
      <Text type="h3" textTransform="uppercase">
        Trusted by students at
      </Text>
      <div
        className="fcc w-screen mt-[25px]"
        style={{
          overflow: "hidden",
          columnGap: 60,
          borderBlock: Borders.dark,
          paddingBlock: 15,
          paddingInline: 35,
        }}
      >
        <div
          className="frc"
          style={{
            columnGap: 60,
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
            // <Image className="frc" {...rest} src={src} alt={alt} />
            <ImageClient
              img={{ ...rest, src, alt, style: { maxWidth: "unset" } }}
            />
            //   </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
