import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';

import { buildWebpackConfig } from './config/webpack/webpack-config';
import { BuildMode, BuildOptions, BuildEnv } from './config/webpack/types/config';

const buildConfig = (env: BuildEnv) => {
  const MODE = env.MODE || BuildMode.DEVELOPMENT;
  const isDevelopment = MODE === BuildMode.DEVELOPMENT;
  dotenv.config({
    path: path.resolve(
      __dirname,
      `.env.${isDevelopment ? BuildMode.DEVELOPMENT : BuildMode.PRODUCTION}`,
    ),
  });
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'http://localhost:8000';

  const buildOptions: BuildOptions = {
    mode: MODE,
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      output: path.resolve(__dirname, 'build'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
    },
    isDevelopment,
    port: PORT,
    host: HOST,
    project: 'frontend',
  };

  const config: webpack.Configuration = buildWebpackConfig(buildOptions);

  return config;
};

export default buildConfig;
