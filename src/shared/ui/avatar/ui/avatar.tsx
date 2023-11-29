import { memo } from 'react';

import { classNames } from 'shared/libs/class-names';

import cls from './avatar.module.scss';

interface Props {
  className?: string;
  src?: string;

  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

const Avatar = memo((props: Props) => {
  const { className, src, small, medium, large, ...otherProps } = props;

  const mods = {
    [cls.small]: small,
    [cls.medium]: medium,
    [cls.large]: large,
  };

  return (
    <div className={cls.wrapper}>
      <img
        className={classNames(cls.avatar, className, mods)}
        src={src}
        width="75"
        height="75"
        alt="avatar"
        {...otherProps}
      />
    </div>
  );
});

export { Avatar };
