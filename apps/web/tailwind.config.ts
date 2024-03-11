import type { Config } from "tailwindcss";
// @ts-ignore
import sharedConfig from "@cllgnotes/tailwind/tailwind.config.js";

const config: Config = {
  ...sharedConfig,
};
module.exports = config;
