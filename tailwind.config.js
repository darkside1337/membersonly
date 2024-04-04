/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./views/layouts/*.ejs", "./views/partials/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
      backgroundImage: {
        bgPattern: "url('/img/paisley.png')",
        "bg-micro-carbon": "url('/img/micro_carbon.png')",
        doodles: "url('/img/doodles.svg')",
        flux: "url('/img/ffflux.svg')",
        underline1: "url('/img/underline1.svg')",
        underline2: "url('/img/underline2.svg')",
      },
      backgroundColor: {
        darkBlue: "#0E0915",
      },
    },
  },
  plugins: [
    /*  {
      tailwindcss: {},
      autoprefixer: {},
    }, */
    require("daisyui"),
  ],
  daisyui: {
    /*     themes: ["light", "dark", "emerald"] */
    themes: ["dark", "light", "cmyk"],
  },
};
