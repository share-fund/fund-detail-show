const { override, fixBabelImports, useBabelRc, disableEsLint } = require("customize-cra");

const closeSourceMap = () => (config) => {
  // 关闭sourceMap
  config.devtool = false;
  return config;
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  // addPostcssPlugins([require("postcss-px2rem")({ remUnit: 32 })]),
  disableEsLint(),
  useBabelRc(),
  closeSourceMap()
);
