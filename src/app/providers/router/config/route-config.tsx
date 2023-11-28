import { RouteProps } from 'react-router-dom';

import { MainPage } from 'pages/main-page';
import { NotFoundPage } from 'pages/not-found-page';
import { LoginPage } from 'pages/login-page';

import { AppRoutes } from 'shared/constants/app-routes';

type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

const routerConfig: AppRouteProps[] = [
  { path: AppRoutes.MAIN, element: <MainPage />, authOnly: true },
  { path: AppRoutes.LOGIN, element: <LoginPage /> },
  { path: AppRoutes.ERROR, element: <NotFoundPage /> },
];

export { routerConfig, AppRouteProps };
