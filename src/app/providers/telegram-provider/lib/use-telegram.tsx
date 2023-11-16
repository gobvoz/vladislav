import { useContext } from 'react';

// import { Theme } from 'shared/constants/theme';
// import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants/local-storage-key';

// import { ThemeContext } from './theme.context';

interface UseTelegramResult {
  // theme: Theme;
  // toggleTheme: () => void;
}

export const useTelegram = (): UseTelegramResult => {
  //const { theme = Theme.DARK, setTheme } = useContext(TelegramContext);

  // const toggleTheme = () => {
  //   const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

  //   setTheme?.(newTheme);
  //   localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  // };

  // return { theme, toggleTheme };
  return {} as UseTelegramResult;
};
