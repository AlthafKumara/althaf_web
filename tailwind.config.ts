import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#161616",
        primary: "#FACC15",
        "text-primary": "#F9FAFB",
        "text-secondary": "#A3A3A3",
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
