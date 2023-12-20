import { memo, useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Message, getLastMessage } from 'entities/message';
import { getWatchDogList } from 'entities/watch-dog';
import { AnswerToMessage } from 'features/answer-to-message';

interface RandomFields {
  [key: string]: string[];
}
interface PatternAnswer {
  patternAnswer: { pattern: string; options: string[] }[];
  randomAnswer: string[];
}
type IDB = PatternAnswer & RandomFields;

const WatchDog = memo(() => {
  const [DB, setDB] = useState<IDB>();
  const [messageToAnswer, setMessageToAnswer] = useState<Message | null>(null);

  const lastMessage = useSelector(getLastMessage);
  const watchDogList = useSelector(getWatchDogList);

  const reloadDBHandler = useCallback(() => {
    fetch('/db.local.json')
      .then(response => {
        response.json().then(data => {
          setDB(data as IDB);
        });
      })
      .catch(error => console.dir(error));
  }, []);

  useEffect(() => {
    reloadDBHandler();
  }, []);

  useEffect(() => {
    if (!DB) return;
    if (!lastMessage) return;

    watchDogList.some(watchDog => {
      watchDog.channelList.some(channel => {
        if (!channel.id.includes(lastMessage?.channelId)) return false;

        watchDog.userList.some(user => {
          if (user.id !== lastMessage?.userId) return false;

          setMessageToAnswer(lastMessage);

          return true;
        });
      });
    });
  }, [lastMessage, watchDogList, messageToAnswer]);

  return (
    <AnswerToMessage messageToAnswer={messageToAnswer} afterAnswer={setMessageToAnswer} db={DB} />
  );
});

export { WatchDog };
