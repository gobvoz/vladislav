import { createContext } from 'react';
import { TelegramClient } from 'telegram';

export interface TelegramContextProps {
  client?: TelegramClient;
  isLoading?: boolean;
  isAuth?: boolean;
  error?: string;

  setLoading?: (loading: boolean) => void;
  setAuth?: (auth: boolean) => void;
  setClient?: (client: TelegramClient) => void;
  setError?: (error: string) => void;
}

export const TelegramContext = createContext<TelegramContextProps>({});
