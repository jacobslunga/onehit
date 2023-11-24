import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        logo: "Logo",
        "reddit-bold": "Reddit Sans Bold",
        "reddit-ex": "Reddit Sans ExtraBold",
        "reddit-semi": "Reddit Sans SemiBold",
        "reddit-reg": "Reddit Sans Regular",
      },
      colors: {
        primary: "#AF0171",
        dark_bg: "#0F0F0F",
        spotify: "#1BD760",
      },
    },
  },
  plugins: [],
};
export default config;
