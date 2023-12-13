import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'shared/hooks';

import {
  getWatchDogList,
  getWatchDogSelectedChannels,
  getWatchDogSelectedUsers,
} from '../../model/selectors/watch-dog-selectors';
import { watchDogActions } from '../../model/slice/watch-dog-slice';

import {
  WATCH_DOG_LIST,
  WATCH_DOG_SELECTED_DIALOG_LIST,
  WATCH_DOG_SELECTED_USER_LIST,
} from 'shared/constants/local-storage-key';

const WatchDogCash = memo(() => {
  const dispatch = useAppDispatch();

  const watchDogList = useSelector(getWatchDogList);
  const selectedChannels = useSelector(getWatchDogSelectedChannels);
  const selectedUsers = useSelector(getWatchDogSelectedUsers);

  useEffect(() => {
    const activeDialogList = JSON.parse(localStorage.getItem(WATCH_DOG_LIST) || '[]');
    const selectedDialogList = JSON.parse(
      localStorage.getItem(WATCH_DOG_SELECTED_DIALOG_LIST) || '[]',
    );
    const selectedUserList = JSON.parse(localStorage.getItem(WATCH_DOG_SELECTED_USER_LIST) || '[]');

    setTimeout(() => {
      dispatch(watchDogActions.setSelectedChannels(selectedDialogList));
      dispatch(watchDogActions.setSelectedUsers(selectedUserList));
      dispatch(watchDogActions.setWatchDogList(activeDialogList));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(WATCH_DOG_SELECTED_DIALOG_LIST, JSON.stringify(selectedChannels));
  }, [selectedChannels]);

  useEffect(() => {
    localStorage.setItem(WATCH_DOG_SELECTED_USER_LIST, JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  useEffect(() => {
    localStorage.setItem(WATCH_DOG_LIST, JSON.stringify(watchDogList));
  }, [watchDogList]);

  return null;
});

export { WatchDogCash };
