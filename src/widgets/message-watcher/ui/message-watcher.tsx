import { memo, useEffect } from 'react';
import { NewMessage, NewMessageEvent } from 'telegram/events';
import { DeletedMessage, DeletedMessageEvent } from 'telegram/events/DeletedMessage';

import { useTelegram } from 'app/providers/telegram-provider';

import { messageActions } from 'entities/message';
import { adoptMessage, adoptMessageList } from 'entities/message/model/adapters/adopt-message';

import { useAppDispatch } from 'shared/hooks';
import { useSelector } from 'react-redux';
import { getActiveDialog } from 'entities/dialog/model/selectors/dialog-selectors';
import { dialogActions } from 'entities/dialog';

interface Props {
  children: React.ReactNode;
}

interface Peer {
  className: string;
  channelId?: bigint;
  chatId?: bigint;
  userId?: bigint;
}

interface Chat {
  title: string;
}

const MessageWatcher = memo((props: Props) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { client, isAuth } = useTelegram();

  const activeDialog = useSelector(getActiveDialog);

  const eventNewMessage = async (event: NewMessageEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const peer: Peer = event.message.peerId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const chat: Chat = event.message._chat;

    const displayedSenderName = [
      event.message._sender?.firstName || '',
      event.message._sender?.lastName || '',
    ].join(' ');
    const displayedChatTitle = chat?.title || '';

    console.groupCollapsed(displayedChatTitle, `(${displayedSenderName})`);
    console.log(event);
    console.log(
      'New message:',
      event.message.peerId.className,
      ' id:',
      (peer.channelId || peer.chatId || peer.userId || '').toString(),
    );
    console.log('-->> ', event.message.message);
    console.groupEnd();

    if (!activeDialog) return;

    const adoptedMessage = adoptMessage(event.message);
    const dialogUpdate = {
      id: (peer.channelId || peer.chatId || peer.userId || '').toString(),
      message: adoptedMessage.text,
      date: adoptedMessage.createdAt,
    };

    dispatch(dialogActions.updateDialog(dialogUpdate));

    if (activeDialog.id === '0') {
      dispatch(messageActions.setMessage(adoptedMessage));
      return;
    }

    if ((peer.channelId || '').toString() === activeDialog.id) {
      dispatch(messageActions.setMessage(adoptedMessage));
    }

    if ((peer.userId || '').toString() === activeDialog.id) {
      dispatch(messageActions.setMessage(adoptedMessage));
    }

    if ((peer.chatId || '').toString() === activeDialog.id) {
      dispatch(messageActions.setMessage(adoptedMessage));
    }
  };

  const eventPrevedMedved = async (event: NewMessageEvent) => {
    event.message.reply({ message: 'Превед, коль ни шутиш.' });
  };

  const eventDeletedMessage = async (event: DeletedMessageEvent) => {
    console.log('Deleted message', event.deletedIds);
    dispatch(messageActions.markDeleted(event.deletedIds));
  };

  useEffect(() => {
    if (!isAuth) return;
    if (!activeDialog || activeDialog.id === '0') return;

    dispatch(messageActions.clear());

    client.connect().then(() => {
      client
        .getMessages(activeDialog?.id, {
          limit: 10,
        })
        .then(messages => {
          dispatch(messageActions.setMessageList(adoptMessageList(messages)));
        });
    });
  }, [activeDialog]);

  useEffect(() => {
    if (!isAuth) return;

    client.connect().then(() => {
      client.getMe().then(me => {
        console.log('me is', me);
      });
    });

    client.addEventHandler(eventNewMessage, new NewMessage({}));
    client.addEventHandler(eventPrevedMedved, new NewMessage({ pattern: /превед медвед/ }));
    client.addEventHandler(eventDeletedMessage, new DeletedMessage({}));

    return () => {
      client.removeEventHandler(eventNewMessage, new NewMessage({}));
      client.removeEventHandler(eventPrevedMedved, new NewMessage({ pattern: /превед медвед/ }));
      client.removeEventHandler(eventDeletedMessage, new DeletedMessage({}));
    };
  }, [isAuth, activeDialog]);

  console.log(client.listEventHandlers());

  return <>{children}</>;
});

export { MessageWatcher };
