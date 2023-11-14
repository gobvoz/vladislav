import { FC, memo } from 'react';

import { classNames } from 'shared/libs/class-names';
import { Button } from 'shared/ui/button';

import cls from './page-error.module.scss';

interface Props {
  className?: string;
}

const PageError: FC<Props> = memo((props: Props) => {
  const { className } = props;

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls.pageError, className)}>
      <p className={cls.errorMessage}>An error has occurred.</p>
      <p className={cls.errorMessage}>Reload the page.</p>
      <Button className={cls.errorButton} onClick={reloadPage}>
        Reload
      </Button>
    </div>
  );
});

export { PageError };
