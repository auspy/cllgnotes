import { atom } from "recoil";

export const atomToast = atom({
  key: "toastState",
  default: {
    text: "",
    secs: 5000,
    type: "success",
  },
});
