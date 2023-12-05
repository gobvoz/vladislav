import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog as TelegramDialog } from 'telegram/tl/custom/dialog';

import { useTelegram } from 'app/providers/telegram-provider/lib/use-telegram';

import { useAppDispatch } from 'shared/hooks';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';

import { userSearchActions, userSearchReducer } from '../model/slice/user-search-slice';
import { getList, getQuery } from '../model/selectors/user-search-selectors';
import { EntityLike } from 'telegram/define';
import { Input } from 'shared/ui/input';
import { getActiveDialog } from 'entities/dialog';
import { useDebounce } from 'shared/hooks/use-debounce';
import { adoptUser } from '../model/adapters/adopt-user-list';

import cls from './user-search.module.scss';

const reducerList = {
  userSearch: userSearchReducer,
};

const UserSearch = memo(() => {
  const queryString = useSelector(getQuery);
  const userList = useSelector(getList);
  const activeDialog = useSelector(getActiveDialog);

  const dispatch = useAppDispatch();
  const { client, isAuth } = useTelegram();

  const fetchUserList = useCallback(
    async (queryString: string) => {
      if (!queryString) {
        dispatch(userSearchActions.setList([]));
        return;
      }

      const userList = [];

      if (activeDialog && activeDialog.id !== '0') {
        try {
          const participants = client.iterParticipants(activeDialog.id as EntityLike, {
            limit: 15,
            search: queryString,
          });

          for await (const participant of participants) {
            userList.push(adoptUser(participant));
          }
        } catch (error) {
          console.dir(error);
        }
      }

      dispatch(userSearchActions.setList(userList));
    },
    [client, activeDialog, queryString],
  );

  const debouncedSearchChange = useDebounce(fetchUserList, 1000);

  const searchHandle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(userSearchActions.setQuery(event.target.value));
      debouncedSearchChange(event.target.value);
    },
    [dispatch, debouncedSearchChange],
  );

  const userClickHandler = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      const userId = (event.target as HTMLElement)
        .closest('[data-user]')
        ?.getAttribute('data-user');

      if (userId) {
        //dispatch(userSearchActions.setUser(userId));
      }
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <div style={{ position: 'relative' }}>
        <Input
          className={cls.search}
          value={queryString}
          onChange={searchHandle}
          placeholder="Search user ..."
        />
        <div className={cls.userList} onClick={userClickHandler}>
          {userList.map(user => (
            <div key={user.id} className={cls.user} data-user={user.id}>
              <span>{[user.firstName, user.lastName].filter(Boolean).join(' ')}</span>
              <span style={{ color: 'var(--color-secondary-text)' }}> (id:{user.id})</span>
              <span> {user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </DynamicModuleLoader>
  );
});

export { UserSearch };
