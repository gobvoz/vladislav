import { memo, useCallback } from 'react';

import { SelectDialogs } from 'features/select-dialogs';
import { SelectUsers } from 'features/select-users';

import { Button } from 'shared/ui/button';
import { classNames } from 'shared/libs/class-names';
import { useAppDispatch } from 'shared/hooks';

import { watchDogActions } from '../../model/slice/watch-dog-slice';

import cls from './watch-dog.module.scss';
import { TextBlock } from 'shared/ui/text-block';

interface Props {
  className?: string;
  toggleEditorVisibility: () => void;
}

const WatchDogEditor = memo((props: Props) => {
  const { className, toggleEditorVisibility } = props;

  const dispatch = useAppDispatch();

  const { addWatchDog } = watchDogActions;

  const handleAddWatchdogClick = useCallback(() => {
    dispatch(addWatchDog());
    toggleEditorVisibility();
  }, []);
  const handleCancelWatchdogClick = useCallback(() => {
    toggleEditorVisibility();
  }, []);

  return (
    <section className={classNames(cls.wrapper, className)}>
      <TextBlock>Select dialogues and users to watch:</TextBlock>
      <TextBlock small>Dialogue:</TextBlock>
      <SelectDialogs />
      <TextBlock small>User:</TextBlock>
      <SelectUsers />
      <div className={cls.buttonWrapper}>
        <Button onClick={handleAddWatchdogClick} primary>
          Add
        </Button>
        <Button onClick={handleCancelWatchdogClick}>Cancel</Button>
      </div>
    </section>
  );
});

export { WatchDogEditor };
