const { resolve } = require('path');
const { EnvironmentPlugin } = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv/config');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'develop' : 'production',
  entry: './src/index.ts',
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    port: 3000,
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: [
      '.vue',
      '.ts',
      '.js',
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                scss: 'vue-style-loader!css-loader!sass-loader'
              }
            }
          }
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('./src/index.html'),
    }),
    new EnvironmentPlugin(['AUTH0_CLIENT_ID', 'AUTH0_DOMAIN', 'AUTH0_JWKS_URI', 'AUTH0_REDIRECT_URI', 'FAUNADB_SERVER_SECRET']),
  ],
};