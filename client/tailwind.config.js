/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "25%": "25%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "45%": "45%",
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "65%": "65%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
        "95%": "95%",
        "100%": "100%"


      },
      colors: {
        primary: "#e8e9eb",
        primaryDark: "#383e44",
        secondary: "#564967",
        acent: "#C7C0AC"
      },
      boxShadow: {
        "custom": "0 12px 15px -7px #383e44, 0 4px 6px -4px #383e44"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.11s ease-in-out infinite',
        'spin-slow': 'spin 1.2s linear infinite',
      }
    },
  },


  plugins: [],
}

