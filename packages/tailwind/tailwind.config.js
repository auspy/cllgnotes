const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/types/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     brandblue: colors.blue[500],
    //     brandred: colors.red[500],
    //   },
    // },
  },
  plugins: [],
};
