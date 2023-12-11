/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-11 17:26:27
 * @Description:
 */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyFilesPlugin = require('./CopyFilesPlugin.js');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@type': path.resolve(__dirname, '../types'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: require.resolve('svg-sprite-loader'),

        options: {
          symbolId: 'icon-[name]', //symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8192,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[contenthash:8].[ext]',
                esModel: false,
              },
            },
            esModel: false,
          },
        },
        exclude: /docs/,
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'iconfont/',
          },
        },
      },
      {
        test: /\.(mp4|MP4)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 0,
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
    }),
    // 使用Three内置字体，把字体文件拷贝至项目中
    new CopyFilesPlugin({
      from: path.resolve(__dirname, '../node_modules/three/examples/fonts'),
      to: path.resolve(__dirname, '../src/assets/thfont'),
    }),
  ],
};
