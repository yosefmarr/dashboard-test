// webpack.config.js
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/js/app.mjs',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: './dist',
    compress: true,
    port: 3001,
  },
  output: {
    filename: 'app.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [resolve(__dirname, './src/js/templates/helpers')],
          partialDirs: [resolve(__dirname, './src/js/templates/partials')],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'src/assets/favicon.ico',
      title: 'Dashboard',
      template: 'src/index.html',
    }),
    new Dotenv(),
  ],
};
