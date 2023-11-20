import { Api } from 'telegram';

import { Message } from '../types/message';

export const adoptMessage = (message: Api.Message): Message => {
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
    channelId: (message.chatId || '').toString(),
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