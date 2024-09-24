"use client";
import { IconButton } from "ui";
import RotateRightIcon from "@mui/icons-material/RotateRight";
const ButtonRotate = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const handleRotate = () => {
    // if (onClick) {
    //   return onClick;
    // }
    // const pdf = document.getElementById("page_1");
    // if (pdf) {
    //   const currentRotation = pdf.style.transform;
    //   const parent = pdf.parentElement;
    //   const height = parent?.clientHeight || pdf.clientHeight;
    //   const width = parent?.clientWidth || pdf.clientWidth;
    //   pdf.style.height = width.toString() + "px";
    //   pdf.style.width = height.toString() + "px";
    //   console.log(
    //     "height change",
    //     pdf.style.height,
    //     pdf.style.width,
    //     parent?.clientHeight,
    //     parent?.clientWidth
    //   );
    //   const rotate = parseInt(
    //     currentRotation.replace("rotate(", "").replace("deg)", "")
    //   );
    //   const currentRotationValue = currentRotation
    //     ? rotation >= 270
    //       ? -90
    //       : rotation
    //     : 0;
    //   pdf.style.transform = `rotate(${currentRotationValue + 90}deg)`;
    // }
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          onClick && onClick(e);
        }}
        title="Rotate Right"
        size={40}
        icon={
          <RotateRightIcon
          // style={{
          //   height: 30,
          //   width: 30,
          // }}
          />
        }
      />
    </>
  );
};

export default ButtonRotate;
