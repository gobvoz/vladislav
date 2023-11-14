import webpack from 'webpack';

import { BuildOptions } from './types/config';

import { webpackCssLoader } from './loaders/css-loader';
import { webpackSvgLoader } from './loaders/svg-loader';
import { webpackBabelLoader } from './loaders/babel-loader';

export const webpackLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const { isDevelopment } = options;

  const svgLoader = webpackSvgLoader();

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: ['file-loader'],
  };

  const cssLoader = webpackCssLoader(isDevelopment);

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: '/node_modules/',
  };

  const babelLoader = webpackBabelLoader(isDevelopment);

  return [babelLoader, fileLoader, svgLoader, typescriptLoader, cssLoader];
};
