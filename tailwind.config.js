/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  safelist: [
    {
      pattern: /(true|protanopia|deuteranopia|tritanopia)-(good|moderate|sensitive|unhealthy|veryUnhealthy|hazardous|black|white|header)/,
    },
  ],
  theme: {
    extend : {
      colors: {
        'true': {
            good: "#00E400",
            moderate: "#FFFF00",
            sensitive: "#FF7E00",
            unhealthy: "#FF0000",
            veryUnhealthy: "#8F3F97",
            hazardous: "#7E0023",
            header: "#004A97",
            black: "#000000",
            white: "#FFFFFF"
          },
          'protanopia': {
            good: "#DDC400",
            moderate: "#FFF7D9",
            sensitive: "#B6A115",
            unhealthy: "#8F7E1E",
            veryUnhealthy: "#375DAD",
            hazardous: "#413E38",
            header: "#1D4A95",
            black: "#000000",
            white: "#FFFFFF"
          },
          'deuteranopia': {
            good: "#F8B933",
            moderate: "#FFF53A",
            sensitive: "#CD9800",
            unhealthy: "#A17800",
            veryUnhealthy: "#4C5F8C",
            hazardous: "#4E3C21",
            header: "#004F87",
            black: "#000000",
            white: "#FFFFFF"
          },
          'tritanopia': {
            good: "#67D3E3",
            moderate: "#FFF4F9",
            sensitive: "#FF777E",
            unhealthy: "#FD1700",
            veryUnhealthy: "#855258",
            hazardous: "#7C100E",
            header: "#00555A",
            black: "#000000",
            white: "#FFFFFF"
          },
        }
      },
    },
  plugins: [],
}

