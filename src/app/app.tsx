import { FC, Suspense } from 'react';

import { PageLoader } from 'widgets/page-loader';
import { ThemeToggler } from 'widgets/theme-toggler';

import { classNames } from 'shared/libs/class-names';

import { useTheme } from './providers/theme-provider/lib/use-theme';
import { AppRouter } from './providers/router';

import './styles/index.scss';

const App: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', theme)}>
      <Suspense fallback={<PageLoader />}>
        <AppRouter />
        <ThemeToggler />
      </Suspense>
    </div>
  );
};

export { App };
