/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@remix-run/(.*)$",
    "^react",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx"],
  plugins: ["@trivago/prettier-plugin-sort-imports"],
}

module.exports = config
