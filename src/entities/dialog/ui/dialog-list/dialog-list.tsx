import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dialog as TelegramDialog } from 'telegram/tl/custom/dialog';
import { TotalList } from 'telegram/Helpers';

import { useTelegram } from 'app/providers/telegram-provider/lib/use-telegram';

import { useAppDispatch } from 'shared/hooks';
import { DynamicModuleLoader } from 'shared/libs/dynamic-module-loader';
import { DialogElement } from 'shared/ui/dialog-element';

import { getDialogList } from '../../model/selectors/dialog-selectors';
import { dialogActions, dialogReducer } from '../../model/slice/dialog-slice';
import { adoptDialogList } from '../../model/adapters/adopt-dialog-list';

import cls from './dialog-list.module.scss';

const reducerList = {
  dialog: dialogReducer,
};

const DialogList = memo(() => {
  const dialogList = useSelector(getDialogList);
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

  useEffect(() => {
    if (!isAuth) return;

    fetchDialogList().then(dialogList => {
      dispatch(dialogActions.setDialogList(adoptDialogList(dialogList)));
    });
  }, [client, isAuth]);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <div className={cls.wrapper} ref={listRef}>
        {dialogList.map(dialog => (
          <DialogElement key={dialog.id} dialog={dialog} />
        ))}
      </div>
    </DynamicModuleLoader>
  );
});

export { DialogList };
