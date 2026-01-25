import type { Config } from "tailwindcss";

export default {
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#d4d4d4',
            a: {
              color: '#22d3ee',
              '&:hover': {
                color: '#67e8f9',
              },
            },
            h1: { color: '#ffffff' },
            h2: { color: '#ffffff' },
            h3: { color: '#ffffff' },
            h4: { color: '#ffffff' },
            strong: { color: '#ffffff' },
            code: {
              color: '#22d3ee',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
            },
            blockquote: {
              borderLeftColor: '#22d3ee',
              color: '#a3a3a3',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
