/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-no-leaked-render": "off",
      },
    },
    {
      rules: {
        "no-undef": "off",
      },
    },
  ],
};
