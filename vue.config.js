const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  },
  css: {
    sourceMap     : true,
    loaderOptions : {
      sass: {
        prependData: '@import "~infocus/style/config/config";',
      },
    },
  },
};