"use client";
import { useRecoilFilter } from "@cllgnotes/lib";
import Autocomplete from "./Autocomplete";
import { useRouter } from "next/navigation";
import { FilterChipProps } from "@cllgnotes/types";
const FilterAutocomplete = ({
  label,
  onChange,
  ...props
}: {
  options: Record<string, string>[];
  label: string;
  onChange?: (value: string[]) => void;
}) => {
  const { queryMap, filters } = useRecoilFilter();
  const router = useRouter();
  const link = (query: "" | { filters: string }) => {
    const params = new URLSearchParams(query);
    router.push("/explore?" + params.toString());
  };
  const onSetValue = (newFilter?: FilterChipProps) => {
    const query = queryMap(newFilter);
    link(query);
    console.log("query", query);
    return query;
  };
  return (
    <Autocomplete
      isFilter={true}
      {...props}
      label={label}
      defaultValue={(filters[label] as unknown as Record<string, string>) || {}}
      setValue={onSetValue}
    />
  );
};

export default FilterAutocomplete;
