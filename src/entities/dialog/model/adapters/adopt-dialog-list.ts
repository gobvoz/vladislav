import { TotalList } from 'telegram/Helpers';
import { Dialog as TelegramDialog } from 'telegram/tl/custom/dialog';

import { Dialog } from '../types/dialog';

interface Peer {
  channelId?: bigint;
  chatId?: bigint;
  userId?: bigint;
}

const adoptDialog = (dialog: TelegramDialog): Dialog => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const peer: Peer = dialog.dialog.peer;

  return {
    id: (peer.channelId || peer.userId || peer.chatId || '').toString(),
    title: dialog.title || 'No title',
    message: dialog.message?.message || null,

    isArchived: dialog.archived,
    isChannel: dialog.isChannel,
    isGroup: dialog.isGroup,
    isUser: dialog.isUser,
    isPinned: dialog.pinned,

    unreadCount: dialog.unreadCount,
    unreadMentionsCount: dialog.unreadMentionsCount,
  };
};

export const adoptDialogList = (dialogList: TotalList<TelegramDialog>): Dialog[] => {
  const adoptedDialogList = dialogList.map(adoptDialog);
  return adoptedDialogList;
};
