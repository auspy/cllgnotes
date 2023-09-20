import ChipGrp from "../buttonGroup/ChipGrp";
import Text from "../text/Text";
import Colors from "@cllgnotes/types/colors";
import ButtonGridIcon from "../buttons/ButtonGridIcon";
import { ToolbarProp$ } from "@cllgnotes/types";

const ToolBar = ({
  found = 1000,
  chipGrpProps,
  isGrid,
  setIsGrid,
}: ToolbarProp$) => {
  return (
    <div className="frfssb w100">
      <div className="frc">
        <Text textClass="fs0 mr15" type="medi16">
          {String(found) + "+ found"}
        </Text>
        <ChipGrp
          {...chipGrpProps}
          // clearFilters={clearFilters}
          // setChipData={setChipData}
          // chipData={chipData}
        />
      </div>
      <div className="frfs ml15" style={{ color: Colors.dark }}>
        {/* will add select dropdown here */}
        <ButtonGridIcon isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
    </div>
  );
};

export default ToolBar;
