import SearchBar from "../searchBar/SearchBar";
import Text from "../text/Text";
import CheckboxGrp from "../buttonGroup/CheckboxGrp";
import { dummyFilterList } from "@cllgnotes/lib/dummyData";
import { ManageFiltersProps } from "@cllgnotes/types";

const FilterSidebar = ({
  addFilter,
  removeFilter,
  maxWidth,
}: ManageFiltersProps) => {
  return (
    <div className="w100" style={{ maxWidth: maxWidth }}>
      <div>
        <SearchBar placeholder="Search for keywords" height={50} />
        <Text textClass="mt10" type="medi12" color="dGrey">
          Eg: coa, maths
        </Text>
      </div>
      <div className="mt30" />
      <CheckboxGrp
        removeFilter={removeFilter}
        addFilter={addFilter}
        data={dummyFilterList}
      />
    </div>
  );
};

export default FilterSidebar;
