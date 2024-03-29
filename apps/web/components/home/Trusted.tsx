import { Borders, ImgProps, TrustedProps } from "@cllgnotes/types";
import { Text } from "ui";
import ImageClient from "./Image";

const Trusted = ({ data }: TrustedProps) => {
  const repeat = 3;
  const arr = new Array(repeat).fill(data);
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
          className="frc "
          style={{
            columnGap: 60,
          }}
        >
          {/* todo for some reason images are not proper. fix this. height is not accurate */}
          {arr.map((data, ii) => (
            <div
              className="frc moveLeft"
              style={{
                columnGap: 60,
              }}
              key={ii}
            >
              {data.map(({ src, alt, ...rest }: ImgProps, i: number) => (
                //   <div
                //     className="rPosi"
                //     key={i + alt}
                //     style={{
                //       ...(rest as React.CSSProperties),
                //     }}
                //   >
                // <Image className="frc" {...rest} src={src} alt={alt} />
                <ImageClient
                  key={i}
                  img={{ ...rest, src, alt, style: { maxWidth: "unset" } }}
                />
                //   </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
