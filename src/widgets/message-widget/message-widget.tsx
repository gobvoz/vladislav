import { memo, useCallback, useState } from 'react';

import { WatchDog, watchDogReducer } from 'entities/watch-dog';
import { MessageList, messageReducer } from 'entities/message';

import { Section } from 'shared/ui/section';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';
import { Tab, TabList } from 'shared/ui/tab-list';

import cls from './message-widget.module.scss';
import { classNames } from 'shared/libs/class-names';

const reducerList = {
  watchDog: watchDogReducer,
  message: messageReducer,
};

const tabList = [
  { id: '0', name: 'All messages' },
  { id: '1', name: 'Watch Dog' },
];

const MessageWidget = memo(() => {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  const onTabClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const messageListClassName = classNames({ [cls.hidden]: activeTab.id !== '0' });
  const watchDogClassName = classNames({ [cls.hidden]: activeTab.id !== '1' });

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <Section tabs={<TabList tabList={tabList} activeTab={activeTab} onClick={onTabClick} />}>
        <MessageList className={messageListClassName} />
        <WatchDog className={watchDogClassName} />
      </Section>
    </DynamicModuleLoader>
  );
});

export { MessageWidget };
