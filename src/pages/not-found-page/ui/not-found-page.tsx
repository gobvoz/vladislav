import { FC, memo } from 'react';

import { classNames } from 'shared/libs/class-names';

import cls from './not-found-page.module.scss';

interface Props {
  className?: string;
}

const NotFoundPage: FC<Props> = memo((props: Props) => {
  const { className } = props;

  return <h1 className={classNames(cls.notFoundPage, className)}>Page not found</h1>;
});

export { NotFoundPage };
