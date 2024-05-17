const { addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = function override(config, env) {
  // add main directories aliases
  addWebpackAlias({
    ["@app"]: path.resolve(__dirname, "./src"),
    ["@constants"]: path.resolve(__dirname, "./src/constants"),
  })(config);

  return config;
};
