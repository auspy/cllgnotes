import { ButtonRowProps } from "@cllgnotes/types/buttonGrps";
import Button from "../buttons/Button";
import ShadowsType from "@cllgnotes/types/shadows";
import { FontWeightEnum } from "@cllgnotes/types/types.text";
import { ButtonFontSizes } from "@cllgnotes/types/types.buttons";

const ButtonRow = ({
  data,
  maxWidth,
  minWidth,
  rowGap = 25,
  buttonProps,
  height = 120,
  columnGap = 30,
}: ButtonRowProps) => {
  return (
    <div
      className={`flex overflow-scroll lg:overflow-hidden gap-x-[20px] lg:grid lg:grid-cols-[auto_auto_auto_auto] lg:gap-y-[${columnGap}]  w100`}
      style={{
        rowGap: rowGap,
        paddingBottom: 4,
        paddingRight: 4,
        // gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
      }}
    >
      {data.map((item, index) => (
        <>
          <Button
            key={item.text + index}
            {...buttonProps}
            {...item}
            buttonStyles={{
              maxWidth: maxWidth,
              minWidth: minWidth,
              boxShadow: ShadowsType.box2,
              ...buttonProps?.buttonStyles,
              ...item.buttonStyles,
            }}
            fontSize={
              buttonProps?.fontSize || item.fontSize || ButtonFontSizes.small
            }
            textProps={{
              fontWeight: FontWeightEnum.semi,
            }}
            iconLeft={true}
            width={"100%"}
            height={height}
          />
        </>
      ))}
    </div>
  );
};

export default ButtonRow;
