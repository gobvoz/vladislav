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
      <div
        style={{
          position: 'absolute',
          top: '2px',
          right: '1px',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '1px',
          backgroundColor: 'var(--bg-main)',
          border: '1px solid var(--color-border)',
          borderRadius: '3px',
          padding: '1px',
          fontSize: '6px',
        }}>
        <div
          style={{
            color: `${dialog.isArchived ? 'currentColor' : 'transparent'}`,
          }}>
          A
        </div>
        <div
          style={{
            color: `${dialog.isChannel ? 'currentColor' : 'transparent'}`,
          }}>
          C
        </div>
        <div
          style={{
            color: `${dialog.isGroup ? 'currentColor' : 'transparent'}`,
          }}>
          G
        </div>
        <div
          style={{
            color: `${dialog.isUser ? 'currentColor' : 'transparent'}`,
          }}>
          U
        </div>
        <div
          style={{
            color: `${dialog.isPinned ? 'currentColor' : 'transparent'}`,
          }}>
          P
        </div>
      </div>
    </div>
  );
});

export { DialogElement };
