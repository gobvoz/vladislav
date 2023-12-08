import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EntityLike } from 'telegram/define';

import { useTelegram } from 'app/providers/telegram-provider';

import { getActiveDialog } from 'entities/dialog';

import { MultiListSelect } from 'shared/ui/multi-list-select/ui/multi-list-select';

import { WATCH_DOG_SELECTED_USER_LIST } from 'shared/constants/local-storage-key';

type Element = { id: string; name: string };
type List = Array<Element>;

const SelectUsers = memo(() => {
  const [selectedUserList, setSelectedUserList] = useState<List>([]);
  const [foundUserList, setFoundUserList] = useState<List>([]);

  const { client } = useTelegram();
  const activeDialog = useSelector(getActiveDialog);

  const adoptUser = useCallback((user: any): Element => {
    const adoptedUser = {
      id: user.id.toString(),
      name: [
        user.firstName,
        user.lastName,
        '(id:',
        user.id,
        ')',
        user.username ? `@${user.username}` : '',
      ].join(' '),
    };

    return adoptedUser;
  }, []);

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

          return userList;
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

      if (result) setFoundUserList(result);
      else setFoundUserList([]);
    },
    [activeDialog],
  );

  useEffect(() => {
    const selectedUserList = JSON.parse(localStorage.getItem(WATCH_DOG_SELECTED_USER_LIST) || '[]');

    setSelectedUserList(selectedUserList);
  }, []);

  const onSelectedUserListChange = useCallback((userList: List) => {
    setSelectedUserList(userList);
    localStorage.setItem(WATCH_DOG_SELECTED_USER_LIST, JSON.stringify(userList));
  }, []);

  return (
    <MultiListSelect
      currentList={selectedUserList}
      foundList={foundUserList}
      getListBySearch={getUserListBySearch}
      setSelectedElements={onSelectedUserListChange}
      placeholder="Start typing to search user ..."
    />
  );
});

export { SelectUsers };
