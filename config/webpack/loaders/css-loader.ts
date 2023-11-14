import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const webpackCssLoader = (isDevelopment: boolean) => {
  const cssLoader = {
    test: /\.s[ac]ss$/,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: true,
            exportLocalsConvention: 'camelCase',
            localIdentName: isDevelopment ? '[path]__[local]--[hash:base64:5]' : '[hash:base64:5]',
          },
        },
      },
      'sass-loader',
    ],
  };

  return cssLoader;
};
