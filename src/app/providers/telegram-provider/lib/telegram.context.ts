import { createContext } from 'react';
import { TelegramClient } from 'telegram';

export interface TelegramContextProps {
  client?: TelegramClient;
  isLoading?: boolean;
  isAuth?: boolean;
  setLoading?: (loading: boolean) => void;
  setAuth?: (auth: boolean) => void;
}

export const TelegramContext = createContext<TelegramContextProps>({});
