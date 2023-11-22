import { memo, useCallback, useEffect, useState } from 'react';
import { Api } from 'telegram';

import { Section } from 'shared/ui/section';

import { Button } from 'shared/ui/button';
import { MessageReplay } from 'shared/ui/message-replay/message-replay';
import { MessageElement } from 'shared/ui/message-element/message-element';
import { adoptMessage } from 'entities/message/model/adapters/adopt-message';

import cls from './answer-to-message.module.scss';

interface RandomFields {
  [key: string]: string[];
}
interface PatternAnswer {
  patternAnswer: { pattern: string; options: string[] }[];
  randomAnswer: string[];
}
type IDB = PatternAnswer & RandomFields;

interface Props {
  message: Api.Message | null;
}

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

const AnswerToMessage = memo((props: Props) => {
  const { message } = props;
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const [DB, setDB] = useState<IDB>();

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

    const patternResult = DB.patternAnswer.reduce<string[]>((acc, pattern) => {
      if (!pattern.pattern) return acc;
      if (!message?.message) return acc;

      try {
        const regexp = new RegExp(pattern.pattern, 'i');

        if (regexp.test(message?.message || '')) {
          const answer = pattern.options[Math.floor(Math.random() * pattern.options.length)];

          acc.push(answer);
        }
      } catch (error) {
        console.log(error);
      }

      return acc;
    }, []);

    if (patternResult.length) {
      const result = patternResult[0];

      const replacedResult = replaceVariables(result, DB);
      //message?.reply({ message: answer });
      setCurrentAnswer(replacedResult);
      return;
    }

    const randomResult = DB.randomAnswer[Math.floor(Math.random() * DB.randomAnswer.length)];
    const replacedResult = replaceVariables(randomResult, DB);
    //message?.reply({ message: answer });
    setCurrentAnswer(replacedResult);
  }, [message]);

  if (!message) return null;

  const adoptedMessage = adoptMessage(message);

  return (
    <Section label={`Test answer section`}>
      <MessageElement message={adoptedMessage}>
        <MessageReplay message={adoptedMessage} />
      </MessageElement>
      <p>{currentAnswer}</p>

      <Button onClick={reloadDBHandler}>Reload DB</Button>
    </Section>
  );
});

export { AnswerToMessage };
