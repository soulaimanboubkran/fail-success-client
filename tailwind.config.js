/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia', 'serif'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
      'display': ['Oswald', 'sans-serif'],
      'Syne': ['Syne', 'sans-serif'],
      'Popins': ["Poppins", 'sans-serif'],
      'Inter': ["Inter", 'sans-serif'],
    },
  
     animation: {
        shimmer: "shimmer 2s linear infinite"
      },
      keyframes: {
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        }
      }
 
  },
  
  plugins: [require('daisyui'),],
}

