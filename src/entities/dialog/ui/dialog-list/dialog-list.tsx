import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dialog as TelegramDialog } from 'telegram/tl/custom/dialog';
import { TotalList } from 'telegram/Helpers';

import { useTelegram } from 'app/providers/telegram-provider/lib/use-telegram';

import { useAppDispatch } from 'shared/hooks';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';
import { DialogElement } from 'shared/ui/dialog-element';

import { getActiveDialog, getDialogList } from '../../model/selectors/dialog-selectors';
import { dialogActions, dialogReducer } from '../../model/slice/dialog-slice';
import { adoptDialogList } from '../../model/adapters/adopt-dialog-list';

import cls from './dialog-list.module.scss';
import { Dialog } from '../../model/types/dialog';

const reducerList = {
  dialog: dialogReducer,
};

const defaultDialog: Dialog = {
  id: '0',
  title: 'All dialogs',
  message: '',

  isArchived: false,
  isChannel: false,
  isGroup: false,
  isUser: false,
  isPinned: false,

  unreadCount: 0,
  unreadMentionsCount: 0,
};

const DialogList = memo(() => {
  const dialogList = useSelector(getDialogList);
  const activeDialog = useSelector(getActiveDialog);
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);
  const { client, isAuth } = useTelegram();

  const fetchDialogList = async () => {
    try {
      await client.connect();
      const dialogList = await client.getDialogs();
      return dialogList;
    } catch (error) {
      console.dir(error);
    }
    return [] as TotalList<TelegramDialog>;
  };

  const setActiveDialog = (dialog: Dialog) => {
    dispatch(dialogActions.setActiveDialog(dialog));
  };

  useEffect(() => {
    setActiveDialog(defaultDialog);
  }, []);

  useEffect(() => {
    if (!isAuth) return;

    fetchDialogList().then(dialogList => {
      console.log(dialogList);
      dispatch(dialogActions.setDialogList([defaultDialog, ...adoptDialogList(dialogList)]));
    });
  }, [client, isAuth]);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <div className={cls.wrapper} ref={listRef}>
        {dialogList.map(dialog => (
          <DialogElement
            key={dialog.id}
            dialog={dialog}
            active={dialog === activeDialog}
            onClick={setActiveDialog}
          />
        ))}
      </div>
    </DynamicModuleLoader>
  );
});

export { DialogList };
