import { useState, useEffect } from 'react';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

import {
  LOCAL_STORAGE_TELEGRAM_API_HASH,
  LOCAL_STORAGE_TELEGRAM_API_ID,
  LOCAL_STORAGE_TELEGRAM_SESSION,
} from 'shared/constants/local-storage-key';

import { TelegramContext } from '../lib/telegram.context';

interface Props {
  children: React.ReactNode;
}

export const TelegramProvider = ({ children }: Props) => {
  const [client, setClient] = useState<TelegramClient>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAuth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const localStorageSession = localStorage.getItem(LOCAL_STORAGE_TELEGRAM_SESSION);
    const localStorageApiId = localStorage.getItem(LOCAL_STORAGE_TELEGRAM_API_ID);
    const LocalStorageApiHash = localStorage.getItem(LOCAL_STORAGE_TELEGRAM_API_HASH);

    const session = new StringSession(JSON.parse(localStorageSession || '""'));
    const apiId = Number(localStorageApiId) || 0;
    const apiHash = LocalStorageApiHash || '';

    let client: TelegramClient;

    try {
      client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });
      console.log(client);
      client.connect().then(() => {
        setLoading(false);
        setAuth(true);
      });

      setClient(client);
    } catch (error) {
      console.dir(error);

      setLoading(false);
      setAuth(false);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ client, isLoading, isAuth, setLoading, setAuth }}>
      {children}
    </TelegramContext.Provider>
  );
};
