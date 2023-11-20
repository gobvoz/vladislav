import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TelegramClient } from 'telegram';
import { NewMessage, NewMessageEvent } from 'telegram/events';
import { DeletedMessage, DeletedMessageEvent } from 'telegram/events/DeletedMessage';

import { Section } from 'shared/ui/section';
import { useAppDispatch } from 'shared/hooks';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';

import { getMessageList } from '../../model/selectors/message-selectors';
import { messageActions, messageReducer } from '../../model/slice/message-slice';
import { adoptMessage } from '../../model/adapters/adopt-message';
import { MessageElement } from '../message-element/message-element';

import cls from './message-list.module.scss';

interface Props {
  client: TelegramClient;
}

const reducerList = {
  message: messageReducer,
};

const MessageList = memo(({ client }: Props) => {
  const messageList = useSelector(getMessageList);
  const dispatch = useAppDispatch();

  const eventNewMessage = async (event: NewMessageEvent) => {
    console.log('New message', event.message);
    dispatch(messageActions.setMessage(adoptMessage(event.message)));
  };

  const eventDeletedMessage = async (event: DeletedMessageEvent) => {
    console.log('Deleted message', event.deletedIds);
    dispatch(messageActions.markDeleted(event.deletedIds));
  };

  useEffect(() => {
    client.connect().then(() => {
      client.getMe().then(me => {
        console.log('me is', me);
      });
    });

    client.addEventHandler(eventNewMessage, new NewMessage({}));
    client.addEventHandler(eventDeletedMessage, new DeletedMessage({}));

    return () => {
      client.removeEventHandler(eventNewMessage, new NewMessage({}));
      client.removeEventHandler(eventDeletedMessage, new DeletedMessage({}));
    };
  }, []);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <Section label={`Messages (${messageList.length})`}>
        <div className={cls.wrapper}>
          {messageList.map(message => (
            <MessageElement key={message.id} message={message} />
          ))}
        </div>
      </Section>
    </DynamicModuleLoader>
  );
});

export { MessageList };