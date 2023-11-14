import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from 'widgets/page-loader';

import { AppRouteProps, routerConfig } from '../config/route-config';

const AppRouter = memo(() => {
  const renderWithAuth = useCallback(({ path, element }: AppRouteProps) => {
    return <Route key={path} path={path} element={element} />;
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{routerConfig.map(renderWithAuth)}</Routes>
    </Suspense>
  );
});

export { AppRouter };
