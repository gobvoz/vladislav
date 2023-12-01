import { memo } from 'react';

import { Dialog } from 'entities/dialog';

import { classNames } from 'shared/libs/class-names';

import cls from './dialog-element.module.scss';

interface Props {
  dialog: Dialog;
  active: boolean;

  onClick: (dialog: Dialog) => void;
}

const DialogElement = memo((props: Props) => {
  const { dialog } = props;

  const onClickHandler = () => {
    props.onClick(dialog);
  };

  const mods = {
    [cls.active]: props.active,
  };

  return (
    <div className={classNames(cls.dialog, mods)} onClick={onClickHandler}>
      {dialog.title}
      <div className={classNames(cls.lastMessage)}>{dialog.message}</div>
    </div>
  );
});

export { DialogElement };
