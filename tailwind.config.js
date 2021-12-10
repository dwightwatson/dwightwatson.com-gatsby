const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],

  theme: {
    colors: {
      blue: colors.blue,
    },
  },

  variants: {},

  plugins: [require("@tailwindcss/typography")],
}
