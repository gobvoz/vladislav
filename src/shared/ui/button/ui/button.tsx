import { ButtonHTMLAttributes, FC, memo } from 'react';

import { classNames } from 'shared/libs/class-names';

import cls from './button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;

  primary?: boolean;
  icon?: boolean;
  transparent?: boolean;
  appLink?: boolean;
  loading?: boolean;
  outlineRed?: boolean;
  checked?: boolean;
}

const Button: FC<Props> = memo((props: Props) => {
  const {
    className,
    children,

    primary,
    icon,
    transparent,
    appLink,
    loading,
    outlineRed,
    checked,

    type = 'button',
    ...otherProps
  } = props;

  const mods = {
    [cls.primary]: primary,
    [cls.icon]: icon,
    [cls.transparent]: transparent,
    [cls.appLink]: appLink,
    [cls.loading]: loading,
    [cls.outlineRed]: outlineRed,
    [cls.checked]: checked,
  };

  return (
    <button className={classNames(cls.button, className, mods)} type={type} {...otherProps}>
      {children}
    </button>
  );
});

export { Button };
