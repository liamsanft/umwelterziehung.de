/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    sans: ["Satoshi", "ui-sans-serif", "system-ui"],
    serif: ["Lora", "ui-serif", "Georgia"],
    extend: {
      colors: {
        "dgu-green": "#63967D",
        "dgu-dark-green": "#435F51",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
