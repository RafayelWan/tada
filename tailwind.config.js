/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF7F3",
        blush: {
          50: "#FDF5F2",
          100: "#F9E6DE",
          200: "#F3CDBD",
          300: "#ECB29B",
          400: "#E39579",
          500: "#D77B61",
        },
        mauve: {
          50: "#F7F2F5",
          100: "#EDE1E8",
          200: "#D9C0CE",
          300: "#C299B0",
          400: "#A8748F",
          500: "#8D5A74",
        },
        sage: {
          50: "#F3F6F2",
          100: "#E0EAD9",
          200: "#BFD3B2",
          300: "#9DBA8B",
          400: "#7C9F67",
          500: "#5E8349",
        },
        ink: {
          900: "#3B2A2E",
          700: "#5B4A4E",
          500: "#8A787C",
          300: "#B8AAAD",
          100: "#E9DFE1",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        serif: ['"DM Serif Display"', '"Noto Serif SC"', "serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(194, 153, 176, 0.12)",
        glow: "0 0 40px rgba(215, 123, 97, 0.25)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.5)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.9" },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "40%": { transform: "translateY(-6px)", opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "60%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        ripple: "ripple 1.8s ease-out infinite",
        breathe: "breathe 2.6s ease-in-out infinite",
        bounceDot: "bounceDot 1.2s ease-in-out infinite",
        fadeUp: "fadeUp 0.5s ease-out both",
        slideIn: "slideIn 0.35s ease-out both",
        pop: "pop 0.45s cubic-bezier(.2,.7,.3,1.1) both",
      },
    },
  },
  plugins: [],
};
