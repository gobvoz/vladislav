import { memo } from 'react';

import { classNames } from 'shared/libs/class-names';

import { Message } from '../../../entities/message/model/types/message';

import cls from './message-element.module.scss';
import { formatToTime } from 'shared/libs/format-to-time/format-to-time';

interface Props {
  message: Message;
  isCurrent?: boolean;
  children?: React.ReactNode;
}

const MessageElement = memo((props: Props) => {
  const { message, isCurrent, children } = props;
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
      {children}
      <span className={cls.messageText}>{message.text}</span>
      <p className={cls.time}>
        {message.updatedAt ? 'edited' : ''}
        {formatToTime(message.updatedAt || message.createdAt)}
      </p>
    </div>
  );
});

export { MessageElement };
