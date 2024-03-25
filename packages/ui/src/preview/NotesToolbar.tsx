"use client";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import IconButton from "../buttons/IconButton";
import { atomPdf } from "@cllgnotes/lib";
import { useRecoilState } from "recoil";
import ButtonRotate from "./ButtonRotate";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
const NotesToolbar = () => {
  // ? this has state management using search params and recoil
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const handleScale = (increment: number = 1) => {
    let scale = Number(pdfState.scale) || 0;
    // || params.get("scale"));
    const newScale = scale ? scale + increment : increment;
    setPdfState((prev) => ({ ...prev, scale: newScale }));
    // params.set("scale", newScale.toString());
    // router.push("?" + params.toString());
  };
  const isFullScreen = pdfState.fullscreen;
  const handleFullscreen = () => {
    const pdf = document.getElementById("pdfContainer");
    const toolbar = document.getElementById("toolbarContainer");
    if (pdf && toolbar) {
      if (!isFullScreen) {
        pdf.setAttribute("data-fullscreen", "true");
        toolbar.classList.remove("lg:pr-[300px]");
      } else {
        pdf.setAttribute("data-fullscreen", "false");
        toolbar.classList.add("lg:pr-[300px]");
      }
    }
    setPdfState((prev) => ({ ...prev, fullscreen: !prev.fullscreen }));
  };
  return (
    <div className="frc gap-3">
      <IconButton
        size={40}
        icon={<ZoomOutIcon />}
        onClick={() => handleScale(-1)}
      />
      <IconButton
        size={40}
        icon={<ZoomInIcon />}
        onClick={() => handleScale()}
      />
      <ButtonRotate />
      <IconButton
        size={40}
        icon={!isFullScreen ? <FullscreenIcon /> : <FullscreenExitIcon />}
        onClick={() => {
          handleFullscreen();
        }}
      />
    </div>
  );
};

export default NotesToolbar;
