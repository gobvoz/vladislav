import { Dialog } from 'entities/dialog';

export const byPinnedDate = (a: Dialog, b: Dialog) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (a.isPinned && !b.isPinned) return -1;
  if (!a.isPinned && b.isPinned) return 1;

  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;

  return 0;
};
