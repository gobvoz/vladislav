import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getActiveDialog, getDialogList } from 'entities/dialog';

import { MultiListSelect } from 'shared/ui/multi-list-select/ui/multi-list-select';
import { WATCH_DOG_SELECTED_DIALOG_LIST } from 'shared/constants/local-storage-key';

type Element = { id: string; name: string };
type List = Array<Element>;

const SelectDialogs = memo(() => {
  const [selectedDialogList, setSelectedDialogList] = useState<List>([]);
  const [foundDialogList, setFoundDialogList] = useState<List>([]);

  const activeDialog = useSelector(getActiveDialog);
  const dialogList = useSelector(getDialogList);

  const adoptDialog = useCallback((dialog: any): Element => {
    const adoptedDialog = {
      id: dialog.id,
      name: dialog.title,
    };

    return adoptedDialog;
  }, []);

  const fetchDialogList = useCallback(
    (queryString: string) => {
      const adoptedDialogList = dialogList
        .filter(dialog => dialog.title.toLocaleLowerCase().includes(queryString.toLowerCase()))
        .map(dialog => adoptDialog(dialog));

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
    setSelectedDialogList(selectedDialogList);
  }, []);

  const onSelectedDialogListChange = useCallback((dialogList: List) => {
    setSelectedDialogList(dialogList);
    localStorage.setItem(WATCH_DOG_SELECTED_DIALOG_LIST, JSON.stringify(dialogList));
  }, []);

  return (
    <MultiListSelect
      currentList={selectedDialogList}
      foundList={foundDialogList}
      getListBySearch={getDialogListBySearch}
      setSelectedElements={onSelectedDialogListChange}
      minimumChars={0}
      placeholder="Start typing to search dialog ..."
    />
  );
});

export { SelectDialogs };
