"use client";
import { atomPdf } from "@cllgnotes/lib";
// import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";

const ButtonDropdown = ({
  options = ["page asc", "page dsc", "date asc", "date dsc"],
}: {
  options?: string[];
}) => {
  // const searchParams = useSearchParams();
  // const sort = searchParams.get("sort") || "page";
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const handleSortChange = (sort: string) => {
    setPdfState((prev) => ({ ...prev, sort }));
  };
  // const router = useRouter();
  return (
    <select
      onChange={(e) => {
        // const params = new URLSearchParams(searchParams);
        // params.set("sort", e.target.value);
        // router.push(`?${params.toString()}`);
        handleSortChange(e.target.value);
      }}
      defaultValue={pdfState.sort}
      className="cardCommon h-[40px]"
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default ButtonDropdown;
