/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fundo: '#212C42',
        rosa: '#E64EEB',
        branco: '#ffffff',
        cinza: '#3C4860',
      },
    },
  },
  plugins: [],
}