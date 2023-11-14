import { FC, memo } from 'react';

import { Spinner } from 'shared/ui/spinner';
import { classNames } from 'shared/libs/class-names';

import cls from './page-loader.module.scss';

interface Props {
  className?: string;
}

const PageLoader: FC<Props> = memo((props: Props) => {
  const { className } = props;
  return (
    <div className={classNames(cls.pageLoader, className)}>
      <Spinner />
    </div>
  );
});

export { PageLoader };
