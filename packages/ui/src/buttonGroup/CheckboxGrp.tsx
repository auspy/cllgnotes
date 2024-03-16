"use client";
import Text from "../text/Text";
import { Checkbox, FormGroup, FormControlLabel } from "../mui/mui";
import { FilterSidebarProps, SliderProps } from "@cllgnotes/types";
import SliderInputBar from "../sliders/SliderInputBar";
import { useRecoilFilter } from "@cllgnotes/lib";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CheckboxGrp = ({ data }: FilterSidebarProps) => {
  const { addFilter, removeFilter, filters, queryMap } = useRecoilFilter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  return (
    <div className="flex flex-col" style={{ rowGap: 20 }}>
      {data.map(
        ({ heading, key, title, type, data, ...sliderProps }, index) => (
          <div key={index}>
            <Text type="semi16">{heading || title}</Text>
            <FormGroup>
              {/* this component can use slider as well as checkbox */}
              {type == "slider" ? (
                <SliderInputBar
                  {...(sliderProps as SliderProps)}
                  onChange={(e, value) => {
                    console.log("change value", value);
                    addFilter(
                      {
                        key,
                        label: value.toString(),
                      },
                      true
                    );
                  }}
                />
              ) : (
                data.map(({ text }, i) => {
                  const checkked = Boolean(
                    filters[key?.toLowerCase()] &&
                      text?.toLowerCase() in filters[key]
                  );
                  const currentFilter = { key, label: text };
                  // console.log("checked", filters[key]);
                  const onChange = (
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    checked = checkked
                  ) => {
                    // console.log("checked", checked);
                    if (checked) {
                      // if already in filter
                      return removeFilter(currentFilter);
                    }

                    addFilter(currentFilter);
                  };

                  const searchQuery: any = queryMap(currentFilter) || {};
                  if (search) {
                    searchQuery["search"] = search;
                  } else {
                    delete searchQuery["search"];
                  }
                  return (
                    <FormControlLabel
                      // onChange={onChange}
                      key={i + text}
                      control={
                        <Link
                          onClick={(e) => {
                            // e.stopPropagation();
                            console.log("link click");
                            onChange(e);
                          }}
                          scroll={false}
                          // href={searchQuery}
                          href={{
                            pathname: "/explore",
                            query: searchQuery,
                          }}
                          // passHref
                        >
                          <Checkbox checked={checkked} />
                        </Link>
                      }
                      label={<Text type="medi16">{text}</Text>}
                    />
                  );
                })
              )}
            </FormGroup>
          </div>
        )
      )}
    </div>
  );
};

export default CheckboxGrp;
