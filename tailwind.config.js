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
        'l-o-titulo': '#ccb99a',
        'l-o-fondo': '#70533e',
        'l-o-texto': '#dbe2ef',
        'l-o-naranja': '#F2573C',
        'l-o-mostaza': '#A56F1D',
        'brazil-fondo': '#e9d1aa',
        'brazil-verde': '#0c8346',
        'brazil-verde-claro': '#a1c828',
        'brazil-azul': "#256fa2",
        'brazil-amarillo': '#f7c548',
        'brazil-gris': '#495867'  
      },
      fontFamily: {
        comic: "'Press Start 2P', serif",  
        pixelify: "'Pixelify Sans', sans-serif",
        changa: "'Changa', sans-serif",
        oeste: "'Arbutus Slab', sans-serif",
        brasil: "'Bahiana', sans-serif"
      }
    },
  },
  plugins: [],
}

