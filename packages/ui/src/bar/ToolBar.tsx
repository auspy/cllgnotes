import ButtonTagGrp from "../buttonGroup/ButtonTagGrp";
import IconButton from "../buttons/IconButton";
import Text from "../text/Text";
import { ViewCompactRounded } from "../mui/mui";
import Colors from "@cllgnotes/types/colors";

const ToolBar = ({ count = 1000 }: { count?: number }) => {
  return (
    <div className="frfssb w100">
      <div className="frc">
        <Text type="medi16">{String(count) + " found"}</Text>
        <ButtonTagGrp />
      </div>
      <div className="frfs" style={{ color: Colors.dark }}>
        {/* will add select dropdown here */}
        <IconButton size={40} icon={<ViewCompactRounded color="inherit" />} />
      </div>
    </div>
  );
};

export default ToolBar;
