import { FC, memo, useState } from 'react';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { Section } from 'shared/ui/section';

import { PageWrapper } from 'widgets/page-wrapper';

import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

import { API_ID, API_HASH } from 'shared/constants/telegram.local';

const SESSION = new StringSession(''); //create a new StringSession, also you can use StoreSession
const client = new TelegramClient(SESSION, API_ID, API_HASH, { connectionRetries: 5 }); // Immediately create a client using your application data
const initialState = { phoneNumber: '', password: '', phoneCode: '' }; // Initialize component initial state

const MainPage: FC = memo(() => {
  const [{ phoneNumber, password, phoneCode }, setAuthInfo] = useState(initialState);

  async function sendCodeHandler() {
    await client.connect(); // Connecting to the server
    await client.sendCode(
      {
        apiId: API_ID,
        apiHash: API_HASH,
      },
      phoneNumber,
    );
  }

  async function clientStartHandler() {
    await client.start({
      phoneNumber,
      password: userAuthParamCallback(password),
      phoneCode: userAuthParamCallback(phoneCode),
      onError: message => {
        console.log(message);
      },
    });

    // await client.sendMessage('me', { message: "You're successfully logged in!" });
    console.log('connected');
  }

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setAuthInfo(authInfo => ({ ...authInfo, [name]: value }));
  }

  const userAuthParamCallback = (param: string) => {
    return async (): Promise<string> => {
      return await new Promise(resolve => {
        resolve(param);
      });
    };
  };

  const getChatListHandler = async () => {
    try {
      await client.connect();
      const dialogs = await client.getDialogs();
      console.log('---------------------------------------');
      dialogs.forEach(dialog => {
        console.log(dialog.dialog.CONSTRUCTOR_ID, dialog.name, dialog.unreadCount);
      });
      console.log('---------------------------------------');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageWrapper>
      <Section label="Login section">
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
        <Input
          label="Phone code"
          name="phoneCode"
          value={phoneCode}
          placeholder="Code which you received in telegram"
          onChange={inputChangeHandler}
        />
        <Button onClick={clientStartHandler}>Send code</Button>
      </Section>
      <Section style={{ marginTop: '20px' }} label="Test's">
        <Button onClick={getChatListHandler}>Get all chats</Button>
      </Section>
    </PageWrapper>
  );
});

export { MainPage };
