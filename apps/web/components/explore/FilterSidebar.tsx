import { dummyFilterSteps } from "@cllgnotes/lib/dummyData";
import { ManageFiltersProps } from "@cllgnotes/types";
import { Text, CheckboxGrp } from "ui";
import SearchBar from "@/components/SearchBar";

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
        <SearchBar placeholder="Search from results" height={50} />
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
