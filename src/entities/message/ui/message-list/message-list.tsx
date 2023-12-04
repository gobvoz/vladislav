import { memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Section } from 'shared/ui/section';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';
import { MessageReplay } from 'shared/ui/message-replay/message-replay';

import { getMessageList } from '../../model/selectors/message-selectors';
import { messageReducer } from '../../model/slice/message-slice';

import { MessageElement } from 'shared/ui/message-element/message-element';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';
import { TabList } from 'shared/ui/tab-list';
import { Tab } from 'shared/ui/tab-list';

const reducerList = {
  message: messageReducer,
};

const tabList = [
  { id: '1', name: 'All messages' },
  { id: '2', name: 'First' },
  { id: '3', name: 'Second' },
  { id: '4', name: 'Third' },
  { id: '5', name: 'Forth' },
  { id: '6', name: 'Fifth' },
];

const MessageList = memo(() => {
  const messageList = useSelector(getMessageList);

  const listRef = useRef<HTMLDivElement>(null);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(tabList[0]);

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

  const onTabClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <Section tabs={<TabList tabList={tabList} activeTab={activeTab} onClick={onTabClick} />}>
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
