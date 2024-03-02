// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js,jsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#28B498',
//         secondary: '#34568B',
//         background: '#F0F4F8',
//         text: '#333333',
//         accent: '#FF6B6B',
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#28B498', // Green color for primary elements
        secondary: '#3FAAA8F2', // Lighter green for secondary elements
        background: '#ECF5F3', // Greyish background color
        text: '#1F2937', // Dark grey color for text
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Suggesting a neutral font that pairs well
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
  