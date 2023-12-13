import { memo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/libs/class-names';
import { useAppDispatch } from 'shared/hooks';

import { getWatchDogList } from '../../model/selectors/watch-dog-selectors';
import { watchDogActions } from '../../model/slice/watch-dog-slice';

import { formatUserName } from 'shared/libs/format-user-name';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';

import cls from './watch-dog.module.scss';
import { Button } from 'shared/ui/button';

interface Props {
  className?: string;
  toggleEditorVisibility: () => void;
}

const WatchDogList = memo((props: Props) => {
  const { className, toggleEditorVisibility } = props;

  const dispatch = useAppDispatch();

  const watchDogList = useSelector(getWatchDogList);

  const listRef = useRef<HTMLDivElement>(null);

  const addWatchDogClick = () => {
    toggleEditorVisibility();
  };

  return (
    <>
      <Button className={className} onClick={addWatchDogClick}>
        Add new Watch Dog
      </Button>
      <ScrollToBottom
        className={classNames(className, cls.wrapper)}
        dependency={watchDogList}
        listRef={listRef}>
        {watchDogList.map(watchDog => (
          <div className={cls.watchDog} key={watchDog.id}>
            <ul className={cls.channelList}>
              {watchDog.channelList.map(channel => (
                <li className={cls.channel} key={channel.id}>
                  {channel.title}
                </li>
              ))}
            </ul>
            <ul className={cls.userList}>
              {watchDog.userList.map(user => (
                <li className={cls.user} key={user.id}>
                  {formatUserName(user)}
                </li>
              ))}
            </ul>
            <button
              className={cls.currentElementDelete}
              onClick={() => dispatch(watchDogActions.removeWatchDog(watchDog.id))}
            />
          </div>
        ))}
      </ScrollToBottom>
    </>
  );
});

export { WatchDogList };
