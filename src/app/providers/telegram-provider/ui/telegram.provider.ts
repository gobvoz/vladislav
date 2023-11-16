import { useState, useMemo } from 'react';

// import { Theme } from 'shared/constants/theme';
// import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants/local-storage-key';

// import { ThemeContext } from '../lib/theme.context';

// const savedTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;

interface Props {
  children: React.ReactNode;
}

export const TelegramProvider = ({ children }: Props) => {
  // const [theme, setTheme] = useState<Theme>(savedTheme);
  // const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);
  // const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);
  // return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
  //return <TelegramContext.Provider value={defaultProps}>{children}</TelegramContext.Provider>;
};
