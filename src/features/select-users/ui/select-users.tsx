import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EntityLike } from 'telegram/define';

import { useTelegram } from 'app/providers/telegram-provider';

import { getActiveDialog } from 'entities/dialog';

import { MultiListSelect } from 'shared/ui/multi-list-select/ui/multi-list-select';

import { WATCH_DOG_SELECTED_USER_LIST } from 'shared/constants/local-storage-key';
import { User, adoptUser, adoptUserList } from 'entities/user';
import { getWatchDogSelectedUsers, watchDogActions } from 'entities/watch-dog';
import { useAppDispatch } from 'shared/hooks';

const SelectUsers = memo(() => {
  const dispatch = useAppDispatch();
  const { setSelectedUsers } = watchDogActions;

  const [foundUserList, setFoundUserList] = useState<User[]>([]);

  const { client } = useTelegram();
  const activeDialog = useSelector(getActiveDialog);
  const selectedUsers = useSelector(getWatchDogSelectedUsers);

  const fetchUserList = useCallback(
    async (queryString: string) => {
      if (!queryString) return;

      const userList = [];

      if (activeDialog && activeDialog.id !== '0') {
        try {
          const participants = client.iterParticipants(activeDialog.id as EntityLike, {
            limit: 100,
            search: queryString,
          });

          for await (const participant of participants) {
            userList.push(adoptUser(participant));
          }

          return userList as User[];
        } catch (error) {
          console.dir(error);
        }
      }
    },
    [client, activeDialog],
  );

  const getUserListBySearch = useCallback(
    async (searchString: string) => {
      if (!searchString) {
        setFoundUserList([]);
        return;
      }

      const result = await fetchUserList(searchString);

      if (result) setFoundUserList(adoptUserList(result));
      else setFoundUserList([]);
    },
    [activeDialog],
  );

  useEffect(() => {
    const selectedUserList = JSON.parse(localStorage.getItem(WATCH_DOG_SELECTED_USER_LIST) || '[]');

    setTimeout(() => {
      dispatch(setSelectedUsers(selectedUserList));
    });
  }, []);

  const onSelectedUserListChange = useCallback((userList: any) => {
    dispatch(setSelectedUsers(userList));
    localStorage.setItem(WATCH_DOG_SELECTED_USER_LIST, JSON.stringify(userList));
  }, []);

  return (
    <MultiListSelect
      currentList={selectedUsers}
      foundList={foundUserList}
      getListBySearch={getUserListBySearch}
      setSelectedElements={onSelectedUserListChange}
      placeholder="Start typing to search user ..."
    />
  );
});

export { SelectUsers };
