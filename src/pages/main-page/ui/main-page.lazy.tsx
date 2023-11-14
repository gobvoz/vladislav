import { lazy } from 'react';

const MainPageLazy = lazy(() =>
  import('./main-page').then(module => ({ default: module.MainPage })),
);

export { MainPageLazy };
