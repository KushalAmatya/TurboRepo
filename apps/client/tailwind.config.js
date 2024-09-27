/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: getColorScale("red"),
        mauve: getColorScale("mauve"),
        plum: getColorScale("plum"),
        blue: getColorScale("blue"),
        violet: getColorScale("violet"),
        sky: getColorScale("sky"),
        pink: getColorScale("pink"),
        purple: getColorScale("purple"),
        crimson: getColorScale("crimson"),
        indigo: getColorScale("indigo"),
        slate: getColorScale("slate"),
        whiteA: getColorScale("whiteA"),
        gray: getColorScale("gray"),
      },
      fontFamily: {
        luckiestguy: ["Luckiest Guy"],
        poppins: ["Poppins"],
      },
      keyframes: {
        "border-spin": {
          "100%": {
            transform: "rotate(360deg)",
          },
          overlayShow: {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          contentShow: {
            from: {
              opacity: "0",
              transform: "translate(-50%, -48%) scale(0.96)",
            },
            to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          },
        },
      },
      animation: {
        "border-spin": "border-spin 7s linear infinite",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

function getColorScale(name) {
  let scale = {};
  for (let i = 1; i <= 12; i++) {
    scale[i] = `var(--${name}-${i})`;
    scale[`a${i}`] = `var(--${name}-a${i})`;
  }
  return scale;
}
