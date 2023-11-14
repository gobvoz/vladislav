export const webpackBabelLoader = (isDevelopment: boolean) => {
  const babelLoader = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
      },
    },
  };

  return babelLoader;
};
