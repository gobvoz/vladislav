import { FC } from 'react';

import { classNames } from 'shared/libs/class-names';

import cls from './page-wrapper.module.scss';

interface Props {
  className?: string;

  children: React.ReactNode;
}

const PageWrapper: FC<Props> = props => {
  const { children, className } = props;

  return <section className={classNames(cls.wrapper, className)}>{children}</section>;
};

export { PageWrapper };
