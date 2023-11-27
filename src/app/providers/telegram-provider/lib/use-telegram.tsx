import { useContext } from 'react';
import { TelegramClient } from 'telegram';

import { TelegramContext } from './telegram.context';

interface UseTelegramResult {
  client: TelegramClient;
  isLoading: boolean;
  isAuth: boolean;
}

export const useTelegram = (): UseTelegramResult => {
  const { client, isLoading, isAuth, setLoading, setAuth } = useContext(TelegramContext);

  const connect = async () => {
    if (!client) return;

    await client.connect();
  };

  return {
    client,
    isLoading,
    isAuth,
    connect,
  } as UseTelegramResult;
};
