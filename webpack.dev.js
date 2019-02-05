const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: "development",
   devtool: 'source-map',
   devServer: {
    historyApiFallback: true,
    port: 8081,
    hotOnly: true,
    overlay: true
   },
});