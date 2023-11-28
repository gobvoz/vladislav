import { useContext } from 'react';
import { TelegramClient } from 'telegram';

import { TelegramContext } from './telegram.context';
import {
  LOCAL_STORAGE_TELEGRAM_API_HASH,
  LOCAL_STORAGE_TELEGRAM_API_ID,
  LOCAL_STORAGE_TELEGRAM_SESSION,
} from 'shared/constants/local-storage-key';
import { StringSession } from 'telegram/sessions';

interface UseTelegramResult {
  client: TelegramClient;
  isLoading: boolean;
  isAuth: boolean;
  error: string;

  connectTelegram: (apiId: string, apiHash: string) => Promise<boolean>;
  requestTelegramCode: (apiId: string, apiHash: string, phoneNumber: string) => Promise<boolean>;
  sendTelegramCode: (phoneNumber: string, password: string, phoneCode: string) => Promise<boolean>;
  disconnectTelegram: () => Promise<void>;
}

export const useTelegram = (): UseTelegramResult => {
  const { client, isLoading, isAuth, error, setLoading, setAuth, setClient, setError } =
    useContext(TelegramContext);

  const userAuthParamCallback = (param: string) => {
    return async (): Promise<string> => {
      return await new Promise(resolve => {
        resolve(param);
      });
    };
  };

  const connectTelegram = async (apiId: string, apiHash: string) => {
    const session = new StringSession('');
    let client: TelegramClient;

    try {
      client = new TelegramClient(session, Number(apiId), apiHash, { connectionRetries: 5 });

      await client.connect();
      const result = await client.checkAuthorization();

      setLoading && setLoading(false);
      setClient && setClient(client);

      if (result) {
        isAuth && setAuth && setAuth(true);
      }

      localStorage.setItem(LOCAL_STORAGE_TELEGRAM_API_ID, apiId);
      localStorage.setItem(LOCAL_STORAGE_TELEGRAM_API_HASH, apiHash);
      localStorage.setItem(LOCAL_STORAGE_TELEGRAM_SESSION, JSON.stringify(client.session.save()));

      return true;
    } catch (error) {
      setError && setError(error.message);

      setLoading && setLoading(false);
      setAuth && setAuth(false);
    }
  };

  const requestTelegramCode = async (apiId: string, apiHash: string, phoneNumber: string) => {
    if (!client) return;

    await client.connect();
    await client.sendCode(
      {
        apiId: Number(apiId),
        apiHash,
      },
      phoneNumber,
    );

    return true;
  };

  const sendTelegramCode = async (phoneNumber: string, password: string, phoneCode: string) => {
    if (!client) return;

    try {
      await client.start({
        phoneNumber,
        password: userAuthParamCallback(password),
        phoneCode: userAuthParamCallback(phoneCode),
        onError: error => {
          setError && setError(error.message);
        },
      });

      localStorage.setItem(LOCAL_STORAGE_TELEGRAM_SESSION, JSON.stringify(client.session.save()));
      client.connect();

      //All updates will be emitted here
      // client.addEventHandler((update: Api.TypeUpdate) => {
      //   console.log('Received new Update ---> ');
      //   console.log(update);
      // });

      setLoading && setLoading(true);
      setAuth && setAuth(true);

      return true;
    } catch (error) {
      setError && setError(error.message);
    }
  };

  const disconnectTelegram = async () => {
    if (!client) return;

    await client.disconnect();
    setAuth && setAuth(true);
  };

  return {
    client,
    isLoading,
    isAuth,
    error,
    connectTelegram,
    requestTelegramCode,
    sendTelegramCode,
    disconnectTelegram,
  } as UseTelegramResult;
};
