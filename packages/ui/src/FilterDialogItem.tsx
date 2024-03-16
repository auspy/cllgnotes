import { ButtonProps } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import { Check } from "lucide-react";

const FilterDialogItem = ({
  text,
  onChange,
  active,
  value,
}: ButtonProps & { value: string }) => {
  return (
    <div className="py-2 px-4 gap-1 w100 hover:bg-lGrey2 rounded-[10px] relative frcsb">
      <label htmlFor="filter item" className="capitalize">
        {text}
      </label>
      <input
        name={text}
        value={value}
        // checked={active as boolean}
        type="checkbox"
        onChange={onChange}
        className="w-full h-full  top-0 left-0 opacity-0 cursor-pointer z-10 absolute"
      />
      {active && (
        <Check className="flex-shrink-0" size={16} color={Colors.lDark} />
      )}
    </div>
  );
};

export default FilterDialogItem;
