import { FC, memo, useState } from 'react';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { Section } from 'shared/ui/section';

import { PageWrapper } from 'widgets/page-wrapper';

import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';

import { API_ID, API_HASH } from 'shared/constants/telegram.local';
import { MessageList } from 'entities/message';
import { Logo } from 'shared/ui/logo';
import { DialogList } from 'entities/dialog';

const SESSION = new StringSession(JSON.parse(localStorage.getItem('session') || '""')); //create a new StringSession, also you can use StoreSession
const client = new TelegramClient(SESSION, API_ID, API_HASH, { connectionRetries: 5 }); // Immediately create a client using your application data
const initialState = { phoneNumber: '', password: '', phoneCode: '' }; // Initialize component initial state

const MainPage: FC = memo(() => {
  const [{ phoneNumber, password, phoneCode }, setAuthInfo] = useState(initialState);

  const [isLoginSectionVisible, setLoginSectionVisibility] = useState(true);

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
    try {
      await client.start({
        phoneNumber,
        password: userAuthParamCallback(password),
        phoneCode: userAuthParamCallback(phoneCode),
        onError: message => {
          console.dir(message);
        },
      });
      localStorage.setItem('session', JSON.stringify(client.session.save()));

      // await client.sendMessage('me', { message: "You're successfully logged in!" });

      // All updates will be emitted here
      // client.addEventHandler((update: Api.TypeUpdate) => {
      //   console.log('Received new Update ---> ');
      //   console.log(update);
      // });
    } catch (error) {
      console.dir(error);
    }
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
      console.log(dialogs);
    } catch (error) {
      console.dir(error);
    }
  };

  const checkUsernameHandler = async () => {
    try {
      await client.connect();
      const result = await client.invoke(
        new Api.users.GetFullUser({
          id: 'gobvoz',
        }),
      );
      console.log(result);
    } catch (error) {
      console.dir(error);
    }
  };

  const getMessagesHandler = async () => {
    await client.connect();
    const msgs = await client.getMessages('me', {
      limit: 10,
    });
    console.log('the total number of msgs are', msgs.total);
    console.log('what we got is ', msgs.length);
    for (const msg of msgs) {
      //console.log("msg is",msg); // this line is very verbose but helpful for debugging
      console.log('msg text is : ', msg.text);
    }
  };

  const getParticipantsHandler = async () => {
    await client.connect();

    try {
      const participants = client.iterParticipants('me', {
        limit: 100,
      });

      for await (const participant of participants) {
        console.log(participant);
      }
    } catch (error) {
      console.dir(error);
    }

    try {
      const result = await client.getParticipants('gramjs', {
        limit: 10,
      });
      console.log(result);
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <PageWrapper>
      <div
        style={{
          height: '100%',
          display: 'flex',
          gap: '20px',
        }}>
        <div
          style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            gap: '20px',
          }}>
          <Section>
            <Logo xSmall />
            <DialogList client={client} />
          </Section>
        </div>
        <div
          style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
          {isLoginSectionVisible && (
            <Section label="Login section">
              <Button
                style={{
                  width: '10px',
                  padding: '3px 15px 3px 9px',
                  position: 'absolute',
                  top: '-13px',
                  right: '-13px',
                }}
                onClick={() => setLoginSectionVisibility(prev => !prev)}>
                x
              </Button>
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
          )}
          <MessageList client={client} />
        </div>
      </div>
    </PageWrapper>
  );
});

export { MainPage };
