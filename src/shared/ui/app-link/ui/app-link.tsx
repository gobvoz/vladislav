import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/libs/class-names';

import cls from './app-link.module.scss';

interface Props extends LinkProps {
  className?: string;

  withoutPadding?: boolean;
}

const AppLink: FC<Props> = memo((props: Props) => {
  const { className, to, children, withoutPadding, ...otherProps } = props;

  const mods = {
    [cls.withoutPadding]: withoutPadding,
  };
  return (
    <Link className={classNames(cls.appLink, className, mods)} to={to} {...otherProps}>
      {children}
    </Link>
  );
});

export { AppLink };
