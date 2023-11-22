import { TotalList } from 'telegram/Helpers';
import { Dialog as TelegramDialog } from 'telegram/tl/custom/dialog';

import { Dialog } from '../types/dialog';

const adoptDialog = (dialog: TelegramDialog): Dialog => {
  return {
    id: dialog.id?.toString() || '',
    title: dialog.title || 'No title',
  };
};

export const adoptDialogList = (dialogList: TotalList<TelegramDialog>): Dialog[] => {
  const adoptedDialogList = dialogList.map(adoptDialog);
  return adoptedDialogList;
};
