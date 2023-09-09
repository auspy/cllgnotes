"use client";
import IconButton from "../buttons/IconButton";
import { ChevronRightRounded, ChevronLeftRounded } from "../mui/mui";
const ArrowBtns = ({ id }: { id: string }) => {
  return (
    <>
      <div className="mr30">
        <IconButton
          onClick={() => {
            if (document?.getElementById(id)) {
              document.getElementById(id)!.scrollLeft += 320;
            }
          }}
          icon={<ChevronRightRounded style={{ height: 30, width: 30 }} />}
        />
        <IconButton
          onClick={() => {
            if (document?.getElementById(id)) {
              document.getElementById(id)!.scrollLeft -= 320;
            }
          }}
          color="grey"
          buttonClasses="my-[25px]"
          icon={<ChevronLeftRounded style={{ height: 30, width: 30 }} />}
        />
      </div>
    </>
  );
};

export default ArrowBtns;
