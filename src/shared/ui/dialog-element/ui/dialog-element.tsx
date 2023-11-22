import { memo } from 'react';

import { Dialog } from 'entities/dialog';

import { classNames } from 'shared/libs/class-names';

import cls from './dialog-element.module.scss';

interface Props {
  dialog: Dialog;
}

const DialogElement = memo((props: Props) => {
  const { dialog } = props;

  return <div className={classNames(cls.dialog)}>{dialog.title}</div>;
});

export { DialogElement };
