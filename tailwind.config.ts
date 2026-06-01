import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#050409",
        graphite: "#11101a",
        plasma: "#a855f7",
        nebula: "#6d28d9",
        acid: "#24f0c4",
        amberlux: "#f6c76f"
      },
      boxShadow: {
        glow: "0 0 40px rgba(168,85,247,0.28)",
        soft: "0 24px 80px rgba(0,0,0,0.35)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
