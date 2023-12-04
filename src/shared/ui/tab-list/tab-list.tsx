import { memo, useCallback } from 'react';

import cls from './tab-list.module.scss';
import { classNames } from 'shared/libs/class-names';

export interface Tab {
  id: string;
  name: string;
}

interface Props {
  className?: string;

  border?: boolean;

  tabList: Tab[];
  activeTab: Tab;

  onClick: (tab: Tab) => void;
}

const TabList = memo((props: Props) => {
  const { className, border, tabList, activeTab, onClick } = props;

  const tabClickHandler = useCallback((event: React.SyntheticEvent<HTMLElement>) => {
    const tabName = (event.target as HTMLElement).getAttribute('data-tab-name');
    onClick(tabList.find(tab => tab.id === tabName) || tabList[0]);
  }, []);

  const mods = {
    [cls.border]: border,
  };

  return (
    <div onClick={tabClickHandler} className={classNames(cls.wrapper, className, mods)}>
      {tabList.map(tab => (
        <div
          key={tab.id}
          className={classNames(cls.tab, { [cls.active]: tab.id === activeTab.id })}
          data-tab-name={tab.id}>
          {tab.name}
        </div>
      ))}
    </div>
  );
});

export { TabList };
