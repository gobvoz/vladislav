import { memo } from 'react';

import { classNames } from 'shared/libs/class-names';

import { MessageReplay } from '../message-replay/message-replay';
import { Message } from '../../model/types/message';

import cls from './message-element.module.scss';
import { formatToTime } from 'shared/libs/format-to-time/format-to-time';

interface Props {
  message: Message;
  smoothScroll: (id: number) => void;
  isCurrent: boolean;
}

const MessageElement = memo((props: Props) => {
  const { message, smoothScroll, isCurrent } = props;
  const mods = {
    [cls.deleted]: message.isDeleted,
    [cls.current]: isCurrent,
  };

  return (
    <div className={classNames(cls.message, mods)} id={`m${message.id}`}>
      <span className={cls.user}>
        {message.userName}
        <span className={cls.userId}>(id:{message.userId})</span>
      </span>
      {message.isReplay && <MessageReplay message={message} smoothScroll={smoothScroll} />}
      <span className={cls.messageText}>{message.text}</span>
      <p className={cls.time}>
        {message.updatedAt ? 'edited' : ''}
        {formatToTime(message.updatedAt || message.createdAt)}
      </p>
    </div>
  );
});

export { MessageElement };
