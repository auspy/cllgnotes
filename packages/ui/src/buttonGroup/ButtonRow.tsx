import { ButtonRowProps } from "@cllgnotes/types/buttonGrps";
import Button from "../buttons/Button";
import { FontWeightEnum } from "@cllgnotes/types/types.text";
import { ButtonFontSizes } from "@cllgnotes/types/types.buttons";

const ButtonRow = ({
  data,
  maxWidth,
  minWidth,
  rowGap = 25,
  commonButtonProps,
  height = 120,
  columnGap = 30,
  onClick,
}: ButtonRowProps) => {
  return (
    <div
      className={`flex overflow-scroll lg:overflow-visible gap-x-[20px] lg:grid lg:grid-cols-[auto_auto_auto_auto] lg:gap-y-[${columnGap}]  w100`}
      style={{
        rowGap: rowGap,
        paddingBottom: 4,
        paddingRight: 4,
        // gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
      }}
    >
      {data.map((item, index) => (
        <Button
          key={item.text + index}
          {...commonButtonProps}
          {...item}
          buttonClasses="shadow-box5"
          buttonStyles={{
            maxWidth: maxWidth,
            minWidth: minWidth,
            ...commonButtonProps?.buttonStyles,
            ...item.buttonStyles,
          }}
          fontSize={
            commonButtonProps?.fontSize ||
            item.fontSize ||
            ButtonFontSizes.small
          }
          textProps={{
            fontWeight: FontWeightEnum.semi,
          }}
          iconLeft={true}
          width={"100%"}
          height={height}
          onClick={(e) => {
            onClick && onClick(e, { label: item.text, key: item.text });
          }}
        />
      ))}
    </div>
  );
};

export default ButtonRow;
