"use client";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { IconButton } from "ui";
import { atomPdf, useKeyPress } from "@cllgnotes/lib";
import { useRecoilState, useSetRecoilState } from "recoil";
import ButtonRotate from "./ButtonRotate";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import { useCallback } from "react";
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
  const handleComment = () => {
    if (pdfState.editTool === "comment") {
      console.log("comment tool off");
      setPdfState((prev) => ({ ...prev, editTool: null }));
      return;
    }
    console.log("comment tool on", pdfState.editTool);
    setPdfState((prev) => ({
      ...prev,
      editTool: "comment",
      showComments: true,
    }));
  };
  const handleCommentVisibility = () => {
    setPdfState((prev) => ({ ...prev, showComments: !prev.showComments }));
  };
  const handleRotateChnage = useCallback((rotate: number = 90) => {
    setPdfState((prev) => {
      const currentRotation = prev.rotate;
      const currentRotationValue = currentRotation
        ? currentRotation >= 270
          ? -90
          : currentRotation
        : 0;
      return { ...prev, rotate: currentRotationValue + rotate };
    });
  }, []);
  const kepPress = useKeyPress({
    dependencies: [pdfState.editTool, pdfState.scale, pdfState.fullscreen],
    key: {
      c: { func: handleComment },
      C: { func: handleCommentVisibility, shiftKey: true },
      Z: { func: handleScale, shiftKey: true },
      X: { func: () => handleScale(-1), shiftKey: true },
      R: {
        shiftKey: true,
        func: handleRotateChnage,
      },
      F: { func: () => handleFullscreen(), shiftKey: true },
    },
  });

  const size = 40;
  const commonShortcutStyle = {
    fontSize: 10,
    marginTop: 3,
    fontWeight: 500,
    opacity: 0.7,
  };
  return (
    <div className="frc gap-3">
      <div>
        <IconButton
          title="Zoom Out"
          size={size}
          disabled={pdfState.scale <= -2}
          icon={<ZoomOutIcon />}
          onClick={() => handleScale(-1)}
        />
        <h4 style={commonShortcutStyle}>{"Shift + X"}</h4>
      </div>
      <div>
        <IconButton
          title="Zoom In"
          size={size}
          disabled={pdfState.scale >= 5}
          icon={<ZoomInIcon />}
          onClick={() => handleScale()}
        />
        <h4 style={commonShortcutStyle}>{"Shift + Z"}</h4>
      </div>
      <div>
        <ButtonRotate onClick={() => handleRotateChnage()} />
        <h4 style={commonShortcutStyle}>{"Shift + R"}</h4>
      </div>
      <div className="fcc">
        <IconButton
          buttonClasses="!hidden md:!flex"
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          size={size}
          icon={!isFullScreen ? <FullscreenIcon /> : <FullscreenExitIcon />}
          onClick={() => {
            handleFullscreen();
          }}
        />
        <h4 style={commonShortcutStyle}>{"Shift + F"}</h4>
      </div>
      <div className="fcc">
        <IconButton
          buttonClasses="!hidden md:!flex"
          title="Add Comment"
          disabled={pdfState.editTool === "comment"}
          size={size}
          icon={<MapsUgcRoundedIcon />}
          onClick={handleComment}
        />
        <h4 style={commonShortcutStyle}>{"C"}</h4>
      </div>
    </div>
  );
};

export default NotesToolbar;
