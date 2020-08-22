module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },

  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],

  theme: {
    // Some useful comment
  },

  variants: {
    // Some useful comment
  },

  plugins: [require("@tailwindcss/typography")],
}
