import { getFilterValues } from "@/api/getFilterValues";
import { CheckboxGrpNew } from "ui";

const FetchedFilters = async () => {
  // ? for now getting all filters together. this can be improved by getting only the required filters
  // ? other improvement that can be done is removing the filters that dont belong to that department or subject or course
  const data = await getFilterValues();
  if (!data) return null;
  console.log(data?.Courses?.length, "course values");
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
