import { Api } from 'telegram';

import { Message } from '../types/message';

export const adoptMessage = (message: Api.Message): Message => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const peer: Peer = message.peerId;

  const adoptedMessage: Message = {
    id: message.id,
    isReplay: !!message.isReply,
    isPrivate: message.isPrivate || false,
    text: message.text,
    createdAt: message.date,
    updatedAt: message.editDate || 0,
    userId: message._senderId?.toString() || '',
    userName: [message._sender?.firstName || '', message._sender?.lastName || ''].join(' '),
    userLogin: '',
    channelId: (peer.channelId || peer.userId || peer.chatId || '').toString(),
  };

  if (message.isReply) {
    adoptedMessage.replayTo = {
      id: message.replyTo?.replyToMsgId || 0,
      text: '',
      userName: '',
    };
  }

  return adoptedMessage;
};

export const adoptMessageList = (messages: Api.Message[]): Message[] => {
  return messages.map(adoptMessage).sort((a, b) => a.createdAt - b.createdAt);
};
