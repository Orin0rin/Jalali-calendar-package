const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'calendar.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Calendar',
      type: 'umd',
      export: 'default' // Ensure default export is used
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Apply only for CSS files
        use: [
          MiniCssExtractPlugin.loader, // injects styles into DOM
          'css-loader'    // parses CSS files
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'calendar.css', // Output CSS file
    }),
  ],
};
