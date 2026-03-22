import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#008751", // Bob's Diner Vibrant Green
          foreground: "#F8F5F2",
        },
        accent: {
          DEFAULT: "#008751", // Same green as requested for all buttons
          foreground: "#FFFFFF",
        },
        background: "#F8F5F2", // Off-white/Cream background
        surface: "#FFFFFF",
        gold: "#D4AF37",
        muted: "#6B7280",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
