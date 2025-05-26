/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'boxColor': '#191D24',
        'light-green-01': '#92A8A1',
        'green-02' : '#71B2AB',
        'dark-green-03': 'rgba(43, 115, 106, 0.75)',
        'create-room-green': '#A4BAB5',
        'joimed-green': 'rgba(146, 168, 161, 0.80)',
        'copy-link-green': '#71B2AB',
        'vote-green': 'rgba(43, 115, 106, 0.75)',
        'anonomus-green': 'rgba(255, 255, 255, 0.00)',
        'custom-gradient': 'linear-gradient(90deg, #3E3E48 56.72%, #191D24 100%)',
      },
      fontFamily: {
        'Head': ['Courier Prime', 'monospace'],
        'Arrow': ['Nanum Gothic Coding', 'monospace'],
        'Butto': ['Inner City', 'sans-serif'],
        'Time-diiiissssssss': ['Fira Code', 'monospace'],
      },
  },
  plugins: [],
}
}