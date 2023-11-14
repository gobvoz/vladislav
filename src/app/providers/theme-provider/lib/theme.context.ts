import { createContext } from 'react';

import { Theme } from 'shared/constants/theme';

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
