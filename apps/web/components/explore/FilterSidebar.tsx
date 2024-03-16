import { dummyFilterSteps } from "@cllgnotes/lib/dummyData";
import { ManageFiltersProps } from "@cllgnotes/types";
import { SearchBar, Text, CheckboxGrp } from "ui";
import FetchedFilters from "./FetchedFilters";

const FilterSidebar = ({
  addFilter,
  removeFilter,
  maxWidth,
  data,
  children,
}: ManageFiltersProps & React.PropsWithChildren) => {
  return (
    <div className="w100" style={{ maxWidth: maxWidth }}>
      <div>
        <SearchBar placeholder="Search for keywords" height={50} />
        <Text textClass="mt10" type="medi12" color="dGrey">
          Eg: coa, maths
        </Text>
      </div>
      <div className="mt30" />
      {/* <FetchedFilters /> */}
      {children}
      <CheckboxGrp
        removeFilter={removeFilter}
        addFilter={addFilter}
        data={dummyFilterSteps}
      />
    </div>
  );
};

export default FilterSidebar;
