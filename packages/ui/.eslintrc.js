/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react"],
  parserOptions: {
    project: true,
  },
};
