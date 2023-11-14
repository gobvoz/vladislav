import { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export const webpackDevServer = (options: BuildOptions): Configuration => {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
};
