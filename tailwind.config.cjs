/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        egg: "#FEF9EF",
        "dark-green": "#435F51",
        "light-green": "#63967D",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
