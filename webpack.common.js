const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.WEBPACK_MODE === 'production';
const globImporter = require("node-sass-glob-importer");
const tsImportPluginFactory = require("ts-import-plugin");
// require("@babel/polyfill");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log(devMode);

module.exports = (env,args)=>{
  console.log(env);

  let isProductionMode = env.production;

  let plugins =  [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CompressionPlugin({test: /\.(png|woff|woff2|eot|ttf|svg)$/}),
  
    new BundleAnalyzerPlugin()
  ]
  if(isProductionMode){
    plugins.push(new CleanWebpackPlugin(['dist']));
    plugins.push(new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css",
      chunkFilename: "[id].css"
    }));
  }else{

  }

  return{
  mode: env.production ? 'production' : 'development',
  entry: ["@babel/polyfill", "./src/index.tsx"],
  // entry: ["./src/index.tsx"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
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
            loader:isProductionMode ? MiniCssExtractPlugin.loader:"style-loader"
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
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
  plugins,
  devtool: 'source-map',
  devServer: !isProductionMode?{
    // contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8081
   }:undefined
}};

