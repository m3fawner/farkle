const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const hashFiles = require('hash-files');

const DEV_SERVER_PORT = 8080;
const languagesPath = path.resolve(__dirname, 'src', 'locales', 'languages');

const localePaths = [
  languagesPath,
];

const LOCALE_HASH = hashFiles.sync({
  files: localePaths,
  algorithm: 'md5',
});

process.env.NODE_ENV = 'dev';
module.exports = {
  entry: [
    require.resolve(`${__dirname}/src/config/polyfills.js`),
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${DEV_SERVER_PORT}`,
    'webpack/hot/only-dev-server',
    './src/hot.module.jsx',
  ],
  mode: 'development',
  optimization: {
    nodeEnv: 'development',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 versions'],
                  grid: true,
                }),
              ],
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'expanded',
              includePaths: [
                path.resolve(__dirname, './node_modules'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        include: path.resolve(__dirname, 'src'),
        loader: [
          'file-loader',
        ],
      },
      {
        test: /\.woff(2)?$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.scss'],
    symlinks: false,
    alias: {
      i18next: path.resolve(__dirname, 'node_modules', 'i18next'),
      _variables: path.resolve(__dirname, 'src', 'components', 'app', '_variables.scss'),
    },
  },
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: languagesPath,
      to: `locales/${LOCALE_HASH}/app`,
      flatten: true,
    }]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      LOCALE_HASH: JSON.stringify(LOCALE_HASH),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
    port: DEV_SERVER_PORT,
  },
};
