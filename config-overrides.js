const { addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = function override(config, env) {
  // add main directories aliases
  addWebpackAlias({
    ["@app"]: path.resolve(__dirname, "./src"),
    ["@constants"]: path.resolve(__dirname, "./src/constants"),
    ["@features"]: path.resolve(__dirname, "./src/features"),
    ["@utils"]: path.resolve(__dirname, "./src/utils"),
    ["@hooks"]: path.resolve(__dirname, "./src/hooks"),
    ["@models"]: path.resolve(__dirname, "./src/models"),
  })(config);

  return config;
};
