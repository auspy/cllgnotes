import Text from "../text/Text";
import { Checkbox, FormGroup, FormControlLabel } from "../mui/mui";
import { FilterSidebarProps } from "@cllgnotes/types";
import SliderInputBar from "../sliders/SliderInputBar";
import { useRecoilFilter } from "@cllgnotes/lib";

const CheckboxGrp = ({ data }: FilterSidebarProps) => {
  const { addFilter, removeFilter, filter } = useRecoilFilter();
  return (
    <div className="flex flex-col" style={{ rowGap: 30 }}>
      {data.map(({ heading, title, type, data, ...sliderProps }, index) => (
        <div key={index}>
          <Text type="semi16">{heading || title}</Text>
          <FormGroup>
            {/* this component can use slider as well as checkbox */}
            {type == "slider" ? (
              <SliderInputBar
                {...sliderProps}
                onChange={(e, value) => {
                  console.log("change value", value);
                  addFilter(
                    {
                      key: String(heading || title),
                      label: value.toString(),
                    },
                    true
                  );
                }}
              />
            ) : (
              data.map(({ text }, i) => (
                <FormControlLabel
                  onChange={(e, checked) => {
                    if (!checked) {
                      return removeFilter({ key: text, label: text });
                    }
                    addFilter({ key: text, label: text });
                  }}
                  key={i + text}
                  control={<Checkbox checked={Boolean(filter[text])} />}
                  label={<Text type="medi16">{text}</Text>}
                />
              ))
            )}
          </FormGroup>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGrp;
