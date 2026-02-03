/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Gambarino', 'serif'],
        body: ['Satoshi', 'sans-serif'],
        sans: ['Satoshi', 'sans-serif'],
      },
      colors: {
        // Brand Color (Terracotta)
        terracotta: '#C67C4E',
        // MD3 Semantic Colors (Source: #C67C4E)
        primary: {
          DEFAULT: '#C67C4E', // Source
          on: '#FFFFFF',
          container: '#FFDCC1',
          'on-container': '#2E1500',
        },
        secondary: {
          DEFAULT: '#765848', // Harmonized Brown
          on: '#FFFFFF',
          container: '#FFDCC1',
          'on-container': '#2C160B',
        },
        tertiary: {
          DEFAULT: '#645F30', // Olive/Green shift for balance
          on: '#FFFFFF',
          container: '#EAE4A9',
          'on-container': '#1F1C00',
        },
        error: {
          DEFAULT: '#BA1A1A',
          on: '#FFFFFF',
          container: '#FFDAD6',
          'on-container': '#410002',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          dim: 'var(--surface-dim)',
          bright: 'var(--surface-bright)',
          'container-lowest': 'var(--surface-container-lowest)',
          'container-low': 'var(--surface-container-low)',
          'container': 'var(--surface-container)',
          'container-high': 'var(--surface-container-high)',
          'container-highest': 'var(--surface-container-highest)',
          on: 'var(--on-surface)',
          'on-variant': 'var(--on-surface-variant)',
          outline: 'var(--outline)',
          'outline-variant': 'var(--outline-variant)',
        },
        // Dark Mode equivalents would be handled via CSS vars usually, 
        // but for prototype simplicity we map them directly or use 'dark:' classes
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',    // MD3 Medium Container
        '2xl': '24px',
        '3xl': '28px',   // MD3 Large Container
        '4xl': '32px',   // MD3 X-Large
        'pill': '9999px', // MD3 Full / Button
      },
      boxShadow: {
        'elevation-1': '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
        'elevation-2': '0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)',
        'elevation-3': '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [],
}