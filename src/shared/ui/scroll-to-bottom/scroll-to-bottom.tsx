import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from 'shared/ui/button';

import cls from './scroll-to-bottom.module.scss';
import { classNames } from 'shared/libs/class-names';

interface Props {
  className?: string;
  children: React.ReactNode;
  listRef?: React.RefObject<HTMLDivElement>;

  dependency?: unknown;
}

const ScrollToBottom = memo((props: Props) => {
  const { className, children, dependency, listRef } = props;

  //const listRef = useRef<HTMLDivElement>(null);

  const [isScrollToBottomVisible, setScrollToBottomVisible] = useState(false);
  const [isAutoScroll, setAutoScroll] = useState(true);

  const scrollHandler = useCallback(() => {
    if (listRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const isScrollToBottomVisible = scrollTop + clientHeight < scrollHeight - 10;

      setScrollToBottomVisible(isScrollToBottomVisible);
      setAutoScroll(!isScrollToBottomVisible);
    }
  }, []);

  const scrollToBottomHandler = useCallback(() => {
    if (listRef?.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });

      setAutoScroll(true);
    }
  }, []);

  useEffect(() => {
    if (isAutoScroll) scrollToBottomHandler();
  }, [dependency]);

  return (
    <div className={classNames(cls.wrapper, className)} ref={listRef} onScroll={scrollHandler}>
      {children}
      {isScrollToBottomVisible && (
        <Button className={cls.toBottom} onClick={scrollToBottomHandler} />
      )}
    </div>
  );
});

export { ScrollToBottom };
