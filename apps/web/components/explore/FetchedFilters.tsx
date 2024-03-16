import { getFilterValues } from "@/api/getFilterValues";
import { CheckboxGrpNew, FilterSidebar } from "ui";

const FetchedFilters = async () => {
  const data = await getFilterValues();
  console.log(data.Courses?.length, "course values");
  return (
    <>
      <CheckboxGrpNew
        data={[
          { title: "Course", key: "course", data: data.Courses },
          { title: "Subject", key: "subject", data: data.Subjects },
          { title: "Department", key: "department", data: data.Departments },
        ]}
      />
    </>
  );
};

export default FetchedFilters;
