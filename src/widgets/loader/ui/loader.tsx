import { FC, memo } from 'react';

import cls from './loader.module.scss';
import { Logo } from 'shared/ui/logo';

const Loader: FC = memo(() => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.substrate}>
        <Logo className={cls.loader} xLarge />
      </div>
    </div>
  );
});

export { Loader };
