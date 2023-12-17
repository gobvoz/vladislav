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
    console.group('last message from:', lastMessage.userName);
    watchDogList.some(watchDog => {
      watchDog.channelList.some(channel => {
        console.log('check channel', channel.id, lastMessage?.channelId);
        if (!channel.id.includes(lastMessage?.channelId)) return false;
        console.log('channel found');
        watchDog.userList.some(user => {
          console.log('check user');
          if (user.id !== lastMessage?.userId) return false;
          console.log('user found');
          setMessageToAnswer(lastMessage);

          return true;
        });
      });
    });
    console.groupEnd();
  }, [lastMessage, watchDogList, messageToAnswer]);

  return (
    <AnswerToMessage messageToAnswer={messageToAnswer} afterAnswer={setMessageToAnswer} db={DB} />
  );
});

export { WatchDog };
