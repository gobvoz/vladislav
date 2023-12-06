import { memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Section } from 'shared/ui/section';
import { MessageReplay } from 'shared/ui/message-replay/message-replay';

import {
  getWatchDogActive,
  getWatchDogChannel,
  getWatchDogMessages,
  getWatchDogUser,
} from '../../model/selectors/watch-dog-selectors';

import { MessageElement } from 'shared/ui/message-element/message-element';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';
import { UserSearch } from 'entities/user-search';
import { Button } from 'shared/ui/button';

interface Props {
  className?: string;
}

const WatchDog = memo((props: Props) => {
  const { className } = props;

  const watchDogList = useSelector(getWatchDogMessages);
  const watchDogUser = useSelector(getWatchDogUser);
  const watchDogChannel = useSelector(getWatchDogChannel);
  const isWatchDogActive = useSelector(getWatchDogActive);

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
    <section className={className}>
      <UserSearch />
      <Section label="Watch Dog">
        <p>channel: {watchDogChannel?.title}</p>
        <p>user: {watchDogUser?.firstName}</p>
        <Button>{isWatchDogActive ? 'Pause' : 'Start'}</Button>
      </Section>
      <ScrollToBottom dependency={watchDogList}>
        {watchDogList.map(message => (
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

export { WatchDog };
