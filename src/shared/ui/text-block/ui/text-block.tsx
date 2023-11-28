import { FC, ReactNode } from 'react';

import { classNames } from 'shared/libs/class-names/class-names';
import cls from './text-block.module.scss';

interface Props {
  className?: string;
  header?: string | null;
  paragraph?: string | null;
  children?: ReactNode;

  small?: boolean;
  medium?: boolean;
  large?: boolean;

  form?: boolean;
  errorMessage?: boolean;
}

const TextBlock: FC<Props> = props => {
  const { className, header, paragraph, children, form, errorMessage, small, medium, large } =
    props;

  const mod = {
    [cls.form]: form,
    [cls.errorMessage]: errorMessage,
    [cls.small]: small,
    [cls.medium]: medium,
    [cls.large]: large,
  };

  return (
    <div className={classNames(cls.textBlock, className, mod)}>
      {header && <h2 className={cls.header}>{header}</h2>}
      {paragraph && <p className={cls.paragraph}>{paragraph}</p>}
      {children && <p className={cls.paragraph}>{children}</p>}
    </div>
  );
};

export { TextBlock };
