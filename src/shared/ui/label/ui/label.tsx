import { LabelHTMLAttributes } from 'react';

import { classNames } from 'shared/libs/class-names';

import cls from './label.module.scss';

export interface SelectOption {
  value: string;
}

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  value?: string;
}

const Label = (props: Props) => {
  const { className, value, children, ...otherProps } = props;

  return (
    <label className={classNames(cls.label, className)} {...otherProps}>
      <span className={cls.fieldName}>{value}</span>
      {children}
    </label>
  );
};

export { Label };
