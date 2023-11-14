import { useEffect } from 'react';

const useAppEffect = (callback: () => void, dependencies: Array<unknown> = []) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') callback();
  }, dependencies);
};

export { useAppEffect };
