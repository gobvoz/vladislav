import { lazy } from 'react';

const LoginPageLazy = lazy(() =>
  import('./login-page').then(module => ({ default: module.LoginPage })),
);

export { LoginPageLazy };
