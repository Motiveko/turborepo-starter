const config = require("@repo/eslint-config/react");
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  parserOptions: {
    project: true,
  },
};
