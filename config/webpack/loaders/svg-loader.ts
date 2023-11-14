export const webpackSvgLoader = () => {
  const svgLoader = {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  };

  return svgLoader;
};
