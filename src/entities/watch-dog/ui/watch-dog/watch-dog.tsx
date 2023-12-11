import { memo, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { SelectDialogs } from 'features/select-dialogs';
import { SelectUsers } from 'features/select-users';

import { Button } from 'shared/ui/button';
import { classNames } from 'shared/libs/class-names';
import { useAppDispatch } from 'shared/hooks';

import { getWatchDogList } from '../../model/selectors/watch-dog-selectors';
import { watchDogActions } from '../../model/slice/watch-dog-slice';

import cls from './watch-dog.module.scss';
import { formatUserName } from 'shared/libs/format-user-name';
import { WATCH_DOG_LIST } from 'shared/constants/local-storage-key';
import { ScrollToBottom } from 'shared/ui/scroll-to-bottom';

interface Props {
  className?: string;
}

const WatchDog = memo((props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const { addWatchDog } = watchDogActions;

  const watchDogList = useSelector(getWatchDogList);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedDialogList = JSON.parse(localStorage.getItem(WATCH_DOG_LIST) || '[]');

    setTimeout(() => {
      dispatch(watchDogActions.setWatchDogList(selectedDialogList));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(WATCH_DOG_LIST, JSON.stringify(watchDogList));
  }, [watchDogList]);

  const handleAddWatchdogClick = useCallback(() => {
    dispatch(addWatchDog());
  }, []);

  return (
    <section className={classNames(cls.wrapper, className)}>
      <SelectDialogs />
      <SelectUsers />
      <Button onClick={handleAddWatchdogClick}>Add Watch Dog</Button>

      <ScrollToBottom className={cls.wrapper} dependency={watchDogList} listRef={listRef}>
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
    </section>
  );
});

export { WatchDog };
