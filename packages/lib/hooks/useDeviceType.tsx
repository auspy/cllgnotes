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
      if (window.innerWidth < 640) {
        setDeviceType(DeviceTypeEnum.mobile);
      } else if (window.innerWidth < 1024) {
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

export const ShowInDevice = ({
  children,
  devices,
}: {
  children: React.ReactNode;
  devices: DeviceTypeEnum[];
}) => {
  const currentDevice = useDeviceType();
  return devices.includes(currentDevice) ? <>{children}</> : null;
};

type DeviceTypeSpread = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

type useDeviceTypeReturn<S extends boolean> = S extends true
  ? DeviceTypeSpread
  : DeviceTypeEnum;

const useDeviceType = <S extends boolean = false>(
  spread: S = false as S
): useDeviceTypeReturn<S> => {
  const device = useContext(ContextDeviceType);

  if (spread) {
    return {
      isMobile: device === DeviceTypeEnum.mobile,
      isTablet: device === DeviceTypeEnum.tablet,
      isDesktop: device === DeviceTypeEnum.desktop,
    } as useDeviceTypeReturn<S>;
  }

  return device as useDeviceTypeReturn<S>;
};

export default useDeviceType;
