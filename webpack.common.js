const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const globImporter = require("node-sass-glob-importer");
const tsImportPluginFactory = require("ts-import-plugin");
// require("@babel/polyfill");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");



module.exports = {
  // entry: ["@babel/polyfill", "./src/index.tsx"],
  entry: ["./src/index.tsx"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory([
                    {
                      libraryName: "antd",
                      libraryDirectory: "lib"
                    },
                    {
                      style: false,
                      libraryName: "lodash",
                      libraryDirectory: null,
                      camel2DashComponentName: false
                    }
                  ])
                ]
              }),
              exclude: /node_modules/
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              importer: globImporter(),
              includePaths: ["./node_modules"]
            }
          }
        ]
      },
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      //   loader: "url-loader?limit=100000"
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".mjs", ".js", ".jsx"],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js"),
       moment: `moment/moment.js` 
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css",
      chunkFilename: "[id].css"
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CompressionPlugin({test: /\.(png|woff|woff2|eot|ttf|svg)$/}),
    new BundleAnalyzerPlugin()
  ],
  // // devtool: "source-map",
  // devServer: {
  //   historyApiFallback: true
  // }
  // // optimization: {
  // //   minimizer: [new UglifyJsPlugin()]
  // // }
};

