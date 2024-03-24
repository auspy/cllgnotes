"use client";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import IconButton from "../buttons/IconButton";
import { atomPdf } from "@cllgnotes/lib";
import { useRecoilState } from "recoil";
import ButtonRotate from "./ButtonRotate";
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
    </div>
  );
};

export default NotesToolbar;
