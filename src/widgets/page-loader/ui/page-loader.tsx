import { FC, memo } from 'react';

import { Logo } from 'shared/ui/logo';

import cls from './page-loader.module.scss';

const PageLoader: FC = memo(() => {
  return (
    <>
      <div className={cls.wrapper}></div>
      <div className={cls.substrate}>
        <Logo className={cls.loader} large />
      </div>
    </>
  );
});

export { PageLoader };
