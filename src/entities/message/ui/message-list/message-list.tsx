import { memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { MessageReplay } from 'shared/ui/message-replay/message-replay';

import { getMessageList } from '../../model/selectors/message-selectors';

import { MessageElement } from 'shared/ui/message-element/message-element';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';
import { classNames } from 'shared/libs/class-names';

import cls from './message-list.module.scss';

interface Props {
  className?: string;
}

const MessageList = memo((props: Props) => {
  const { className } = props;

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
    <section className={classNames(cls.wrapper, className)}>
      <ScrollToBottom dependency={messageList} listRef={listRef}>
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
    </section>
  );
});

// <AnswerToMessage message={lastMessage} />
export { MessageList };
