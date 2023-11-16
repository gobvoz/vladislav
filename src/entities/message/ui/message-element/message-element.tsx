import { memo } from 'react';

import { MessageReplay } from '../message-replay/message-replay';
import { Message } from '../../model/types/message';

import cls from './message-element.module.scss';

interface Props {
  message: Message;
}

const MessageElement = memo((props: Props) => {
  const { message } = props;

  return (
    <div className={cls.message}>
      <span className={cls.user}>
        {message.userName}
        <span className={cls.userId}>(id:{message.userId})</span>
      </span>
      {message.isReplay && <MessageReplay message={message} />}
      <span className={cls.messageText}>{message.text}</span>
    </div>
  );
});

export { MessageElement };
