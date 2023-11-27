import { FC, memo } from 'react';

import cls from './not-found-page.module.scss';
import { Logo } from 'shared/ui/logo';

const NotFoundPage: FC = memo(() => {
  return (
    <div className={cls.notFoundPage}>
      <Logo className={cls.logo} xLarge />
      <h1>Page not found</h1>
    </div>
  );
});

export { NotFoundPage };
