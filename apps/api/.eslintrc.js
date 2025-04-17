/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/server.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "import/no-cycle": "off",
    "@typescript-eslint/consistent-type-imports": "off",
  },
};
