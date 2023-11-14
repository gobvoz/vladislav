import { useContext } from 'react';

import { Theme } from 'shared/constants/theme';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants/local-storage-key';

import { ThemeContext } from './theme.context';

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
  const { theme = Theme.DARK, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, toggleTheme };
};
