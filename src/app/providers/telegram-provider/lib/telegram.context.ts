import { createContext } from 'react';

// import { Theme } from 'shared/constants/theme';

export interface TelegramContextProps {
  // theme?: Theme;
  // setTheme?: (newTheme: Theme) => void;
}

export const TelegramContext = createContext<TelegramContextProps>({});
