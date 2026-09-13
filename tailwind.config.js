/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
      colors: {
        brand: {
          purple: 'rgb(140 82 255 / <alpha-value>)',
          pink: 'rgb(244 194 194 / <alpha-value>)',
          beige: 'rgb(245 245 220 / <alpha-value>)',
          charcoal: 'rgb(51 51 51 / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
