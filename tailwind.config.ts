import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#ea580c",
        "brand-silver": "#e7e5e5",
        "brand-red": "#ef4444",
        "form-blue": "#EEF0F8",
        "form-white": "#E9EBF4",
        grey: "#999D9F",
        "light-grey": "#E4E6EB",
        black: "#050505",
        "black-faded": "#65676B",
      },
      borderRadius: {
        const: "1.25rem",
      },
      fontFamily: {
        athenes: ["athenes", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(100%)",
            // opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            // opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 300ms linear",
        "slide-up": "slide-up 100ms linear",
        "rotate-clockwise": "rotate-clockwise 1s infinite linear",
      },
      backgroundImage: {
        "pleep-gradient":
          "linear-gradient(90deg, #D45E2C 11.29%, #DE457E 87.9%)",
      },
    },
  },
  plugins: [],
};
export default withUt(config);
