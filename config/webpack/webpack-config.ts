import webpack from 'webpack';

import { webpackPlugins } from './webpack-plugins';
import { webpackLoaders } from './webpack-loaders';
import { webpackResolvers } from './webpack-resolvers';
import { webpackDevServer } from './webpack-dev-server';

import { BuildOptions } from './types/config';

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths, isDevelopment } = options;

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash:8].js',
      path: paths.output,
      clean: true,
      publicPath: '/',
    },
    plugins: webpackPlugins(options),
    module: {
      rules: webpackLoaders(options),
    },
    resolve: webpackResolvers(options),
    devtool: isDevelopment ? 'inline-source-map' : undefined,
    devServer: isDevelopment ? webpackDevServer(options) : undefined,
  };
};
