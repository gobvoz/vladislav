import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Api, TelegramClient } from 'telegram';
import { NewMessage, NewMessageEvent } from 'telegram/events';
import { DeletedMessage, DeletedMessageEvent } from 'telegram/events/DeletedMessage';

import { Section } from 'shared/ui/section';
import { useAppDispatch } from 'shared/hooks';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';

import { getMessageList } from '../../model/selectors/message-selectors';
import { messageActions, messageReducer } from '../../model/slice/message-slice';
import { adoptMessage } from '../../model/adapters/adopt-message';
import { MessageElement } from '../../../../shared/ui/message-element/message-element';

import cls from './message-list.module.scss';
import { AnswerToMessage } from 'features/answer-to-message/ui/answer-to-message/answer-to-message';
import { MessageReplay } from 'shared/ui/message-replay/message-replay';

interface Props {
  client: TelegramClient;
}

const reducerList = {
  message: messageReducer,
};

const MessageList = memo(({ client }: Props) => {
  const messageList = useSelector(getMessageList);
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const [lastMessage, setLastMessage] = useState<Api.Message | null>(null);

  const eventNewMessage = async (event: NewMessageEvent) => {
    console.log('New message', event.message);
    dispatch(messageActions.setMessage(adoptMessage(event.message)));
    setLastMessage(event.message);
  };

  const eventPrevedMedved = async (event: NewMessageEvent) => {
    event.message.reply({ message: 'Превед, коль ни шутиш.' });
  };

  const eventDeletedMessage = async (event: DeletedMessageEvent) => {
    console.log('Deleted message', event.deletedIds);
    dispatch(messageActions.markDeleted(event.deletedIds));
  };

  const smoothScrollToMessage = useCallback((id: number) => {
    if (listRef.current) {
      const message = listRef.current.querySelector(`#m${id}`);
      if (message) {
        message.scrollIntoView({ block: 'center', behavior: 'smooth' });
        setCurrentMessageId(id);
        setTimeout(() => {
          setCurrentMessageId(null);
        }, 300);
      }
    }
  }, []);

  useEffect(() => {
    client.connect().then(() => {
      client.getMe().then(me => {
        console.log('me is', me);
      });
    });

    client.addEventHandler(eventNewMessage, new NewMessage({}));
    client.addEventHandler(eventPrevedMedved, new NewMessage({ pattern: /превед медвед/ }));
    client.addEventHandler(eventDeletedMessage, new DeletedMessage({}));

    return () => {
      client.removeEventHandler(eventNewMessage, new NewMessage({}));
      client.removeEventHandler(eventDeletedMessage, new DeletedMessage({}));
    };
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 1000,
        behavior: 'smooth',
      });
    }
  }, [messageList]);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <Section label={`Messages (${messageList.length})`}>
        <div className={cls.wrapper} ref={listRef}>
          {messageList.map(message => (
            <MessageElement
              key={message.id}
              message={message}
              isCurrent={message.id === currentMessageId}>
              <MessageReplay message={message} smoothScroll={smoothScrollToMessage} />
            </MessageElement>
          ))}
        </div>
      </Section>

      <AnswerToMessage message={lastMessage} />
    </DynamicModuleLoader>
  );
});

export { MessageList };
