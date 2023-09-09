import SearchBar from "../searchBar/SearchBar";
import Text from "../text/Text";
import CheckboxGrp from "../buttonGroup/CheckboxGrp";
import { dummyFilterList } from "@cllgnotes/lib/dummyData";

const FilterSidebar = () => {
  return (
    <div className="w100" style={{ maxWidth: 320 }}>
      <div>
        <SearchBar placeholder="Search for keywords" height={50} />
        <Text textClass="mt10" type="medi12" color="dGrey">
          Eg: coa, maths
        </Text>
      </div>
      <div className="mt30" />
      <CheckboxGrp data={dummyFilterList} />
    </div>
  );
};

export default FilterSidebar;
