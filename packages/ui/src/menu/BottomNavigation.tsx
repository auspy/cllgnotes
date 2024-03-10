import { BottomNavigation as BN, BottomNavigationAction } from "../mui/mui";
import { BottomNavigationProps } from "@cllgnotes/types";
import { useRouter } from "next/navigation";
const BottomNavigationMenu = ({
  menu,
  active,
  setActive,
}: BottomNavigationProps) => {
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActive(newValue);
  };
  return (
    <>
      <BN
        sx={{ width: "100%" }}
        style={{ position: "fixed", bottom: 0 }}
        value={active}
        onChange={handleChange}
      >
        {menu.map((item, index) => (
          <BottomNavigationAction
            key={index + item.name}
            label={item.name}
            value={item.name}
            icon={item.icon}
            onClick={(e) => {
              router.push(item.href);
              handleChange(e, item.name);
            }}
          />
        ))}
      </BN>
    </>
  );
};

export default BottomNavigationMenu;
