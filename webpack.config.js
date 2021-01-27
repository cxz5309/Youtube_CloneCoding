const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCSS = require("extract-text-webpack-plugin")
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILR = path.resolve(__dirname, "assets", 'js', 'main.js');
module.exports = {
    mode: MODE,
    devtool: 'cheap-module-source-map',
    entry: ["@babel/polyfill", ENTRY_FILR],
    module: {
        rules: [
          {
            test: /\.(js)$/,
            use: ['babel-loader']
          },
          {
            test: /\.(scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        [
                          "autoprefixer",
                          {
                            overrideBrowserslist:"cover 99.5%"
                          },
                        ],
                      ],
                    },
                  },
              },
              'sass-loader'
            ],
          },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'static')
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'styles.css'}),
    ],
};