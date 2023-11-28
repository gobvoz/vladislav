import { FC, memo, useEffect, useState } from 'react';
import { Section } from 'shared/ui/section';

import { useTelegram } from 'app/providers/telegram-provider';

import { PageWrapper } from 'widgets/page-wrapper';

import { Logo } from 'shared/ui/logo';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import { TextBlock } from 'shared/ui/text-block';
import { AppLink } from 'shared/ui/app-link';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from 'widgets/page-loader';
import {
  LOCAL_STORAGE_TELEGRAM_API_HASH,
  LOCAL_STORAGE_TELEGRAM_API_ID,
} from 'shared/constants/local-storage-key';

const initialState = { apiId: '', apiHash: '', phoneNumber: '', password: '', phoneCode: '' }; // Initialize component initial state

const LoginPage: FC = memo(() => {
  const [{ apiId, apiHash, phoneNumber, password, phoneCode }, setAuthInfo] =
    useState(initialState);
  const [loginProgress, setLoginProgress] = useState(0);

  const { isAuth, isLoading, error, connectTelegram, requestTelegramCode, sendTelegramCode } =
    useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageApiId = localStorage.getItem(LOCAL_STORAGE_TELEGRAM_API_ID);
    const LocalStorageApiHash = localStorage.getItem(LOCAL_STORAGE_TELEGRAM_API_HASH);

    setAuthInfo(authInfo => ({
      ...authInfo,
      apiId: localStorageApiId || '',
      apiHash: LocalStorageApiHash || '',
    }));
  }, []);

  useEffect(() => {
    if (isAuth) navigate('/', { replace: true });
  }, [isAuth]);

  const connectHandler = async () => {
    const result = await connectTelegram(apiId, apiHash);

    if (result) setLoginProgress(1);
  };

  const sendCodeHandler = async () => {
    const result = await requestTelegramCode(apiId, apiHash, phoneNumber);
    if (result) setLoginProgress(2);
  };

  const clientStartHandler = async () => {
    const result = await sendTelegramCode(phoneNumber, password, phoneCode);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthInfo(authInfo => ({ ...authInfo, [name]: value }));
  };

  if (isLoading) return <PageLoader />;
  if (isAuth) return <PageLoader />;

  return (
    <PageWrapper>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
        <Logo large />
        <Section label="Login to telegram" style={{ width: '100%', height: 'auto' }}>
          {loginProgress === 0 && (
            <>
              <TextBlock>
                Before working with Telegram’s API, you need to get your own API ID and hash:
              </TextBlock>
              <TextBlock>
                Login to your Telegram account with the phone number of the developer account to
                use.
              </TextBlock>
              <TextBlock>
                <AppLink to={'https://my.telegram.org/apps'} withoutPadding target="blank">
                  https://my.telegram.org/apps
                </AppLink>
              </TextBlock>
              <TextBlock>
                Click under{' '}
                <span style={{ color: 'var(--color-context)' }}>API Development tools</span>. A{' '}
                <span style={{ color: 'var(--color-context)' }}>Create new application</span> window
                will appear. Fill in your application details. There is no need to enter any URL,
                and only the first two fields (App title and Short name) can currently be changed
                later. Click on{' '}
                <span style={{ color: 'var(--color-context)' }}>Create application</span> at the
                end. Remember that your API hash is secret and Telegram won't let you revoke it.
                Don’t post it anywhere!
              </TextBlock>
              <Input
                type="text"
                label="App API ID"
                name="apiId"
                value={apiId}
                placeholder="77241876"
                onChange={inputChangeHandler}
                error={error}
              />
              <Input
                type="text"
                label="App API hash"
                name="apiHash"
                value={apiHash}
                placeholder="a69203af2ac92751345adb1329abd237"
                onChange={inputChangeHandler}
                error={error}
              />
              <Button onClick={connectHandler}>Connect client</Button>
            </>
          )}
          {loginProgress >= 1 && (
            <>
              <Input
                type="tel"
                label="Phone number with country code (international format)"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="+17017995555"
                onChange={inputChangeHandler}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                value={password}
                placeholder="Enter user's password"
                onChange={inputChangeHandler}
              />
              <Button onClick={sendCodeHandler}>Start client</Button>
            </>
          )}
          {loginProgress === 2 && (
            <>
              <Input
                label="Phone code"
                name="phoneCode"
                value={phoneCode}
                placeholder="Code which you received in telegram"
                onChange={inputChangeHandler}
                error={error}
              />
              <Button onClick={clientStartHandler}>Send code</Button>
            </>
          )}
          {error && <TextBlock errorMessage>{error}</TextBlock>}
        </Section>
      </div>
    </PageWrapper>
  );
});

export { LoginPage };
