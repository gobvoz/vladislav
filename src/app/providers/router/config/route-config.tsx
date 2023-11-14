import { RouteProps } from 'react-router-dom';

import { MainPage } from 'pages/main-page';
import { NotFoundPage } from 'pages/not-found-page';

import { AppRoutes } from 'shared/constants/app-routes';

type AppRouteProps = RouteProps & {
  element: JSX.Element;
};

const routerConfig: AppRouteProps[] = [
  { path: AppRoutes.MAIN, element: <MainPage /> },
  { path: AppRoutes.ERROR, element: <NotFoundPage /> },
];

export { routerConfig, AppRouteProps };
