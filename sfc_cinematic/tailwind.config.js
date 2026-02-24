/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F2EB', // Calce
        primary: '#0F0F0D', // Inchiostro
        accent: '#E8521A', // Segnale
        secondary: '#6B8F71', // Salvia
        premium: '#C8A84B', // Ottone
        calce: '#F5F2EB',
        inchiostro: '#0F0F0D',
        segnale: '#E8521A',
        salvia: '#6B8F71',
        ottone: '#C8A84B',
      },
      fontFamily: {
        sans: ['"Unbounded"', 'sans-serif'], // For titles
        drama: ['"Literata"', 'serif'], // For drama text and body
        mono: ['"JetBrains Mono"', 'monospace'], // For data/mono
      },
    },
  },
  plugins: [],
}
