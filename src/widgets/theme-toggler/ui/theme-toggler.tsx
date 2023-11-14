import { ButtonHTMLAttributes, FC, memo } from 'react';

import { useTheme } from 'app/providers/theme-provider';

import { Button } from 'shared/ui/button';
import { classNames } from 'shared/libs/class-names';
import { Theme } from 'shared/constants/theme';

import cls from './theme-toggler.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ThemeToggler: FC<Props> = memo((props: Props) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      primary
      className={classNames(cls.themeToggler, className)}
      onClick={toggleTheme}>
      {theme === Theme.DARK ? 'D' : 'L'}
    </Button>
  );
});

export { ThemeToggler };
