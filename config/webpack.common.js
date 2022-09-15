const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    assetModuleFilename: 'images/[name].[hash:8][ext]',
  },

  // Customize the webpack build process
  plugins: [
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public + '/assets/images/pets',
          to: 'images/pets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: paths.public + '/assets/images/icons',
          to: 'images/icons',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      template: paths.src + '/pages/index.ejs', // template file
      filename: 'index.html', // output file
    }),
    new HtmlWebpackPlugin({
      template: paths.src + '/pages/pets.ejs', // template file
      filename: 'pets/index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      { test: /\.ejs$/i, use: ['html-loader', 'template-ejs-loader'] },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      { test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, type: 'asset/resource' },
    ],
  },

  resolve: {
    alias: {
      '@': paths.src,
      '@public': paths.public,
    },
  },
};
