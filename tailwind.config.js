/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'negro': '#000000',
        'violeta': '#3A0CA3',
        'lila': '#895DEF',
        'turquesa': '#00FFEB',
        'fucsia': '#FF00C1',
        'blanco': '#FFFFFF',
      },
      fontFamily: {
        comic: "'Press Start 2P', serif",  
        pixelify: "'Pixelify Sans', sans-serif",
        changa: "'Changa', sans-serif",
      }
    },
  },
  plugins: [],
}

