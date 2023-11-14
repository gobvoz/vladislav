import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { BuildOptions } from './types/config';

export const webpackPlugins = (options: BuildOptions): webpack.WebpackPluginInstance[] => {
  const { paths, isDevelopment, host, project } = options;

  const plugins = [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
      chunkFilename: 'css/[name].[contenthash:5].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDevelopment),
      __API_BASE_URL__: JSON.stringify(host),
      __PROJECT__: JSON.stringify(project),
    }),
  ];

  if (isDevelopment) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
