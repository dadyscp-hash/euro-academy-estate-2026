import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./tests/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#020204",
        deep: "#070711",
        space: "#080F2A",
        gold: "#D6A84F",
        accretion: "#FF8A3D",
        lunar: "#F5F7FA",
        metal: "#A7AAB4",
        gravity: "#5B3FFF"
      },
      fontFamily: {
        display: ["var(--font-space)", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "Manrope", "system-ui", "sans-serif"]
      },
      boxShadow: {
        cosmic: "0 0 55px rgba(214, 168, 79, 0.18)",
        orbit: "0 0 28px rgba(255, 138, 61, 0.22)"
      },
      backgroundImage: {
        "cosmic-radial": "radial-gradient(circle at center, rgba(214,168,79,0.24), rgba(91,63,255,0.08) 38%, transparent 68%)"
      }
    }
  },
  plugins: []
};

export default config;
