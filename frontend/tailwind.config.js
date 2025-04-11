module.exports = {
    content: [
      "./src/**/*.{js,jsx}", // Chemin vers tous vos composants React
      "./public/index.html"
    ],
    theme: {
      extend: {
        minWidth: { // Ajoutez cette section
          '40': '10rem', // min-w-40 = 10rem (40 × 0.25rem)
        }
      },
    },
    plugins: [],
  }
