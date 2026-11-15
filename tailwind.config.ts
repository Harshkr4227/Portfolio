import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0B",
        "surface-elevated": "#121212",
        "surface-paper": "#E8E5DE",
        "text-primary": "#E8E5DE",
        "text-secondary": "#777777",
        "text-accent": "#E34B43",
        "text-telemetry": "#B5A99A"
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"]
      }
    }
  },
  plugins: []
};
export default config;
