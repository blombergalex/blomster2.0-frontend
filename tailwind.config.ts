import type { Config } from "tailwindcss";
import {nextui} from '@nextui-org/react'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          layout: {},
          colors: {
            focus: '#D3D3D3',
            background: '#0D001A', // Dark background
            foreground: '#ffffff', // Light text
            primary: {
              DEFAULT: '#FF8C00', // Default orange
              foreground: '#ffffff',
              300: '#F4743B', // Dark orange
              500: '#D3D3D3', // Light text color
            },
          },
        },
      },
    }),
  ],
} 

export default config;
