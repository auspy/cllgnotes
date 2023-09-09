"use client";
import { useContext, useEffect, useState } from "react";
import { DeviceTypeEnum } from "@cllgnotes/types";
import { createContext } from "react";

const ContextDeviceType = createContext<DeviceTypeEnum>(DeviceTypeEnum.desktop);

// uses recoil and react code
export const DeviceTypeWrapper = ({ children }: React.PropsWithChildren) => {
  const [device, setDeviceType] = useState<DeviceTypeEnum>(
    DeviceTypeEnum.desktop
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setDeviceType(DeviceTypeEnum.mobile);
      } else if (window.innerWidth < 992) {
        setDeviceType(DeviceTypeEnum.tablet);
      } else {
        setDeviceType(DeviceTypeEnum.desktop);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <ContextDeviceType.Provider value={device}>
        {children}
      </ContextDeviceType.Provider>
    </>
  );
};

const useDeviceType = () => {
  const device = useContext(ContextDeviceType);
  return device;
};

export default useDeviceType;
