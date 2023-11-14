import React, { memo, InputHTMLAttributes } from 'react';

import cls from './input.module.scss';
import { Label } from 'shared/ui/label';
import { classNames } from 'shared/libs/class-names';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface Props extends HTMLInputProps {
  className?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: any;
}

const Input = memo((props: Props) => {
  const { className, label, value, onChange, type = 'text', error, ...otherProps } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(evt.target.value);
  };

  return (
    <Label value={label} className={className}>
      <input
        className={classNames(cls.input, { [cls.error]: error })}
        value={value}
        onChange={handleChange}
        type={type}
        {...otherProps}
      />
    </Label>
  );
});

export { Input };
