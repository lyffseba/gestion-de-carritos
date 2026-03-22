import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obys: {
          bg: '#e8e6e1', // Obys warm off-white
          text: '#111111', // Very dark gray/black
          accent: '#c02c25', // Classic graphic design red or simple
          border: '#d0cdc5', // Darker off-white for borders
        }
      },
    },
  },
  plugins: [],
};

export default config;
