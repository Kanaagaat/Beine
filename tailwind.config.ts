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
        brand: {
          bg: "#FFFFFF",
          surface: "#F8FAFC",
          text: "#111827",
          muted: "#6B7280",
          border: "#E5E7EB",
          accent: "#EF4444",
          accentDark: "#BE3144",
        },
      },
    },
  },
  plugins: [],
};
export default config;
