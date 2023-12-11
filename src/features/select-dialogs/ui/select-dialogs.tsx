import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dialog, getActiveDialog, getDialogList } from 'entities/dialog';

import { MultiListSelect } from 'shared/ui/multi-list-select/ui/multi-list-select';
import { WATCH_DOG_SELECTED_DIALOG_LIST } from 'shared/constants/local-storage-key';
import { getWatchDogSelectedChannels, watchDogActions } from 'entities/watch-dog';
import { useAppDispatch } from 'shared/hooks';

const SelectDialogs = memo(() => {
  const dispatch = useAppDispatch();
  const { setSelectedChannels } = watchDogActions;

  const [foundDialogList, setFoundDialogList] = useState<Dialog[]>([]);

  const selectedChannels = useSelector(getWatchDogSelectedChannels);
  const activeDialog = useSelector(getActiveDialog);
  const dialogList = useSelector(getDialogList);

  const fetchDialogList = useCallback(
    (queryString: string) => {
      const adoptedDialogList = dialogList.filter(dialog =>
        dialog.title.toLocaleLowerCase().includes(queryString.toLowerCase()),
      );

      return adoptedDialogList;
    },
    [dialogList],
  );

  const getDialogListBySearch = useCallback(
    (searchString: string) => {
      const result = fetchDialogList(searchString);

      if (result) setFoundDialogList(result);
      else setFoundDialogList([]);
    },
    [activeDialog],
  );

  useEffect(() => {
    const selectedDialogList = JSON.parse(
      localStorage.getItem(WATCH_DOG_SELECTED_DIALOG_LIST) || '[]',
    );

    setTimeout(() => {
      dispatch(setSelectedChannels(selectedDialogList));
    });
  }, []);

  const onSelectedDialogListChange = useCallback((dialogList: any) => {
    dispatch(setSelectedChannels(dialogList));
    localStorage.setItem(WATCH_DOG_SELECTED_DIALOG_LIST, JSON.stringify(dialogList));
  }, []);

  return (
    <MultiListSelect
      currentList={selectedChannels}
      foundList={foundDialogList}
      getListBySearch={getDialogListBySearch}
      setSelectedElements={onSelectedDialogListChange}
      minimumChars={0}
      placeholder="Start typing to search dialog ..."
    />
  );
});

export { SelectDialogs };
