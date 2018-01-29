"use strict";

const path = require("path");
const STYLE_GLOBAL_FILE = "__global.css";

function styleLoader(config = {}) {
  const include = config.include || undefined;
  const exclude = config.exclude || undefined;
  const cssModules = config.cssModules || false;
  const cssMinimize = config.cssMinimize || false;

  return {
    test: /.css$/,
    include,
    exclude,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader",
        options: {
          modules: cssModules,
          minimize: cssMinimize,
          localIdentName: cssMinimize ? "[hash:12]" : "[local]____[path][name]____[hash:base64:5]",
          alias: {
            "../fonts": "bootstrap/fonts",
          },
        }
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            require("postcss-import")({})
          ]
        }
      }
    ]
  }
}


module.exports = {
  entry: {
    styles: [
      path.resolve(__dirname, "styles", STYLE_GLOBAL_FILE),
      path.resolve(__dirname, "styles", "index.css")
    ]
  },
  output: {
    path: path.resolve(path.join(__dirname, "builds")),
    filename: "bundle.[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      styleLoader({
        include: path.join(__dirname, "styles", STYLE_GLOBAL_FILE),
        cssMinimize: true,
      }),
      styleLoader({
        exclude: path.join(__dirname, "styles", STYLE_GLOBAL_FILE),
        cssModules: true,
        cssMinimize: false,
      }),
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [{
          loader: "file-loader"
        }]
      }
    ]
  }
};
