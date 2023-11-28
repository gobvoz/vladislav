// FIXME
// eslint-disable-next-line @gobvoz/fsd/path-checker
import { useTelegram } from 'app/providers/telegram-provider';

import { Navigate, useLocation } from 'react-router-dom';

import { AppRoutes } from 'shared/constants/app-routes';

const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { isAuth } = useTelegram();
  const location = useLocation();

  if (!isAuth && location.pathname !== '/login') {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export { RequireAuth };
