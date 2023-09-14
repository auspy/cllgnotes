import { DeviceTypeEnum } from "@cllgnotes/types";
import { createContext } from "react";

export const ContextDeviceType = createContext<DeviceTypeEnum>(
  DeviceTypeEnum.desktop
);
