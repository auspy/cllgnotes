import { FilterSidebarProps } from "@cllgnotes/types";
import FilterAutocomplete from "../FilterAutocomplete";
import Text from "../text/Text";

const CheckboxGrpNew = ({ data }: Partial<FilterSidebarProps>) => {
  return (
    <div id="filters" className="flex flex-col w100 gap-4 mb-4">
      {data?.map(
        ({ heading, key, title, type, data, ...sliderProps }, index) => (
          <div key={index} className="w100">
            <Text type="semi16" textClass="mb-1">
              {heading || title}
            </Text>
            <FilterAutocomplete
              options={data as Record<string, string>[]}
              label={key || heading || title || ""}
            />
          </div>
        )
      )}
    </div>
  );
};

export default CheckboxGrpNew;
