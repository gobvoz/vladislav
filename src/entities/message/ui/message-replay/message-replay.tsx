import { memo } from 'react';

import { Message } from '../../model/types/message';

import cls from './message-replay.module.scss';
import { classNames } from 'shared/libs/class-names';

interface Props {
  message: Message;
}

const MessageReplay = memo((props: Props) => {
  const { message } = props;

  const mods = {
    [cls.deleted]: message.replayTo?.isDeleted,
  };

  if (message.replayTo) {
    return (
      <div className={classNames(cls.replay, mods)}>
        <div className={cls.userName}>{message.replayTo.userName}</div>
        <div>{message.replayTo.text}</div>
      </div>
    );
  }

  return <span className={cls.replay}>Unknown replay</span>;
});

export { MessageReplay };
