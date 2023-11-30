import Text from "../text/Text";
import { Checkbox, FormGroup, FormControlLabel } from "../mui/mui";
import { FilterSidebarProps } from "@cllgnotes/types";

const CheckboxGrp = ({ data, addFilter, removeFilter }: FilterSidebarProps) => {
  return (
    <div className="flex flex-col" style={{ rowGap: 30 }}>
      {Object.keys(data).map((key, index) => (
        <div key={index + key}>
          <Text type="semi16">{key}</Text>
          <FormGroup>
            {data[key].map((item, i) => (
              <FormControlLabel
                onChange={(e, checked) => {
                  if (!checked) {
                    return removeFilter({ key: item, label: item });
                  }
                  addFilter({ key: item, label: item });
                }}
                key={i + item}
                control={<Checkbox defaultChecked={false} />}
                label={<Text type="medi16">{item}</Text>}
              />
            ))}
          </FormGroup>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGrp;
