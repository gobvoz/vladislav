import { memo } from 'react';

import { Message } from '../../model/types/message';

import cls from './message-replay.module.scss';

interface Props {
  message: Message;
}

const MessageReplay = memo((props: Props) => {
  const { message } = props;

  if (message.replayTo) {
    return (
      <div className={cls.replay}>
        <div className={cls.userName}>{message.replayTo.userName}</div>
        <div>{message.replayTo.text}</div>
      </div>
    );
  }

  return <span className={cls.replay}>Unknown replay</span>;
});

export { MessageReplay };
