"use client";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import FilterDialogItem from "./FilterDialogItem";
import SearchBox from "./SearchBox";
import { X } from "lucide-react";
import Colors from "@cllgnotes/types/colors";
import { FilterChipProps } from "@cllgnotes/types";
import { throttle } from "@cllgnotes/lib";

const Autocomplete = ({
  options,
  label,
  setValue,
  defaultValue,
  isFilter = false,
  limit,
  name,
  className,
}: {
  options: Record<string, string>[];
  label: string;
  name?: string;
  isFilter?: boolean;
  setValue: (newFilter?: FilterChipProps) => "" | { filters: string };
  defaultValue?: Record<string, string>; // {id: name}
  limit?: number;
} & { className?: string }) => {
  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState<Record<string, string>>(
    defaultValue || {}
  ); // {id: name}
  const [search, setSearch] = useState("");
  const containerRef: any = useRef(null);
  useEffect(() => {
    setSelected(defaultValue || {});
  }, [defaultValue]);
  useEffect(() => {
    const handleOutsideClick = throttle((event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShow(false); // Clicked outside, close the box
      }
    }, 300);

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const removeValue = (text: string, value?: string) => {
    if (isFilter) {
      setValue({
        label: text,
        key: name || label,
      });
      return;
    }
    const newVal = { ...selected };
    delete newVal[text];
    setValue({
      label: text,
      key: name || label,
    });
    setSelected(newVal);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name: nm } = e.target;
    if (isFilter) {
      setValue({
        label: value,
        key: name || label,
        value: nm,
      });
      return;
    }
    // console.log("value", value, checked);
    if (!checked) {
      // already selected, remove it
      removeValue(value);
    } else {
      if (
        (limit && Object.keys(selected).length >= limit) ||
        value in selected
      ) {
        return;
      }
      const newVal = { ...selected };
      newVal[value] = nm;
      setValue({
        label: value,
        key: name || label,
        value: nm,
      });
      setSelected(newVal);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative w100" ref={containerRef}>
      <div
        className={`card2  frc flex-wrap gap-1 min-h-[40px] ${
          className || "!rounded-[10px] p-1 px-2"
        }`}
        onClick={() => setShow(!show)}
      >
        {Array.isArray(Object.values(selected)) &&
        Object.values(selected).length > 0 ? (
          Object.values(selected).map((skill, index) => (
            <div
              key={index}
              className="frc gap-1 py-1 px-2 bg-lGrey2 border-lDark border rounded-[10px]"
            >
              <h3>{skill.substring(0, 20)}</h3>
              <X
                size={16}
                className="hover"
                onClick={() => removeValue(Object.keys(selected)[index])}
                color={Colors.lDark}
              />
            </div>
          ))
        ) : (
          <p className="opacity-[0.6]">Select {label || ""}</p>
        )}
      </div>
      {show && (
        <Dialog setShow={setShow}>
          <SearchBox value={search} onChange={handleSearchChange} />
          {Array.isArray(options) &&
            options
              ?.filter((item) => {
                return item?.name?.match(new RegExp(search, "i"));
              })
              .sort()
              .map((skill, index) => (
                <FilterDialogItem
                  active={skill._id in selected}
                  key={index}
                  onChange={handleChange}
                  text={skill.name}
                  value={skill._id}
                />
              ))}
        </Dialog>
      )}
    </div>
  );
};

export default Autocomplete;
