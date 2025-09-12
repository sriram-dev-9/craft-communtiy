/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'minecraft': ['Courier New', 'monospace'],
      },
      colors: {
        minecraft: {
          grass: '#7CB342',
          dirt: '#8D6E63',
          stone: '#9E9E9E',
          cobblestone: '#616161',
          wood: '#8D6E63',
          leaves: '#4CAF50',
          water: '#2196F3',
          lava: '#FF5722',
          gold: '#FFC107',
          diamond: '#00BCD4',
          emerald: '#4CAF50',
          redstone: '#F44336',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}