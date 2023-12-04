import { memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Section } from 'shared/ui/section';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';
import { MessageReplay } from 'shared/ui/message-replay/message-replay';

import { getMessageList } from '../../model/selectors/message-selectors';
import { messageReducer } from '../../model/slice/message-slice';

import { MessageElement } from 'shared/ui/message-element/message-element';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';

const reducerList = {
  message: messageReducer,
};

const MessageList = memo(() => {
  const messageList = useSelector(getMessageList);

  const listRef = useRef<HTMLDivElement>(null);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);

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

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <Section label={`Messages (${messageList.length})`}>
        <ScrollToBottom dependency={messageList}>
          {messageList.map(message => (
            <MessageElement
              key={message.id}
              message={message}
              isCurrent={message.id === currentMessageId}>
              {message.isReplay && (
                <MessageReplay message={message} smoothScroll={smoothScrollToMessage} />
              )}
            </MessageElement>
          ))}
        </ScrollToBottom>
      </Section>

      {/* <AnswerToMessage message={lastMessage} /> */}
    </DynamicModuleLoader>
  );
});

export { MessageList };
