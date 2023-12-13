import { memo, useCallback, useState } from 'react';

import { WatchDogCash, WatchDogEditor, WatchDogList, watchDogReducer } from 'entities/watch-dog';
import { MessageList, messageReducer } from 'entities/message';

import { Section } from 'shared/ui/section';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';
import { Tab, TabList } from 'shared/ui/tab-list';

import cls from './message-widget.module.scss';
import { classNames } from 'shared/libs/class-names';
import { WatchDog } from 'features/watch-dog';
import { Button } from 'shared/ui/button';

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
  const [isWatchDogEditorActive, setIsWatchDogEditorActive] = useState(false);

  const onTabClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const messageListClassName = classNames({ [cls.hidden]: activeTab.id !== '0' });
  const watchDogClassName = classNames({ [cls.hidden]: activeTab.id !== '1' });

  const toggleEditorVisibility = useCallback(() => {
    setIsWatchDogEditorActive(!isWatchDogEditorActive);
  }, [isWatchDogEditorActive]);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <Section tabs={<TabList tabList={tabList} activeTab={activeTab} onClick={onTabClick} />}>
        <MessageList className={messageListClassName} />
        {isWatchDogEditorActive && (
          <WatchDogEditor
            className={watchDogClassName}
            toggleEditorVisibility={toggleEditorVisibility}
          />
        )}
        {!isWatchDogEditorActive && (
          <WatchDogList
            className={watchDogClassName}
            toggleEditorVisibility={toggleEditorVisibility}
          />
        )}
        <WatchDogCash />
        <WatchDog />
      </Section>
    </DynamicModuleLoader>
  );
});

export { MessageWidget };
