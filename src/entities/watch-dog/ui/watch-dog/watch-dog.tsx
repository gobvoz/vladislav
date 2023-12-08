import { memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { SelectDialogs } from 'features/select-dialogs';
import { SelectUsers } from 'features/select-users';

import { Section } from 'shared/ui/section';
import { MessageReplay } from 'shared/ui/message-replay/message-replay';
import { MessageElement } from 'shared/ui/message-element/message-element';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';
import { Button } from 'shared/ui/button';
import { classNames } from 'shared/libs/class-names';

import { getWatchDogActive, getWatchDogMessages } from '../../model/selectors/watch-dog-selectors';

import cls from './watch-dog.module.scss';

interface Props {
  className?: string;
}

const WatchDog = memo((props: Props) => {
  const { className } = props;

  const watchDogList = useSelector(getWatchDogMessages);
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
    <section className={classNames(cls.wrapper, className)}>
      <SelectDialogs />
      <SelectUsers />
      <Button>{isWatchDogActive ? 'Pause' : 'Start'}</Button>

      <Section label="Watch Dog"></Section>

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
