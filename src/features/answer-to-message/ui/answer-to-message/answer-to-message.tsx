import { memo, useEffect } from 'react';

import { useTelegram } from 'app/providers/telegram-provider';
import { Message } from 'entities/watch-dog';

interface RandomFields {
  [key: string]: string[];
}
interface PatternAnswer {
  patternAnswer: { pattern: string; options: string[] }[];
  randomAnswer: string[];
}
type IDB = PatternAnswer & RandomFields;

const getRandomVariableValue = (variableName: string, DB: IDB) => {
  if (!DB[variableName]) return '';
  if (!DB[variableName].length) return '';

  const value = DB[variableName][Math.floor(Math.random() * DB[variableName].length)];
  return value;
};

// @depth - for prevent infinite recursion
const replaceVariables = (text: string, DB: IDB, depth = 1) => {
  if (depth > 10) return text;
  let result = text;

  const regexp = /\${\w+}/g;
  const variables = result.match(regexp);

  if (!variables) return result;

  variables.forEach(variable => {
    const variableName = variable.replace('${', '').replace('}', '');
    const variableValue = getRandomVariableValue(variableName, DB);

    result = result.replace(variable, variableValue);
  });

  result = replaceVariables(result, DB, depth + 1);

  return result;
};

interface Props {
  messageToAnswer: Message | null;
  db?: IDB;
  afterAnswer: (result: null) => void;
}

const AnswerToMessage = memo((props: Props) => {
  const { messageToAnswer, db, afterAnswer } = props;

  const { client } = useTelegram();

  useEffect(() => {
    if (!db) return;
    if (!messageToAnswer) return;

    const patternResult = db.patternAnswer.reduce<string[]>((acc, pattern) => {
      if (!pattern.pattern) return acc;
      if (!messageToAnswer) return acc;

      try {
        const regexp = new RegExp(pattern.pattern, 'i');

        if (regexp.test(messageToAnswer?.text || '')) {
          const answer = pattern.options[Math.floor(Math.random() * pattern.options.length)];

          acc.push(answer);
        }
      } catch (error) {
        console.log(error);
      }

      return acc;
    }, []);

    let replacedResult = '';

    if (patternResult.length) {
      const result = patternResult[0];
      replacedResult = replaceVariables(result, db);
    } else {
      const randomResult = db.randomAnswer[Math.floor(Math.random() * db.randomAnswer.length)];
      replacedResult = replaceVariables(randomResult, db);
    }

    // send answer to user
    // client?.sendMessage(messageToAnswer.channelId, {
    //   message: replacedResult,
    //   replyTo: messageToAnswer?.id,
    // });

    //generate message text to save
    const replayedMessageText = messageToAnswer.isReplay
      ? `${messageToAnswer.replayTo?.userName}: ${messageToAnswer.replayTo?.text}`
      : '';
    const textToReplay = `${messageToAnswer.userName}: ${messageToAnswer.text}`;

    // save original user message
    client?.sendMessage('Me', {
      message: replayedMessageText + '\n' + textToReplay,
      replyTo: messageToAnswer?.id,
    });
    // save answer to user
    client?.sendMessage('Me', {
      message: textToReplay + '\n' + replacedResult,
      replyTo: messageToAnswer?.id,
    });

    afterAnswer(null);
  }, [messageToAnswer, db, afterAnswer]);

  return null;
});

export { AnswerToMessage };
