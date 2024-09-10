/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'principal-azul': '#2D4059',
        'secundario-naranja': '#FF5722',
        'secundario-blanco': '#EEEEEE'

      }
    },
  },
  plugins: [],
}

