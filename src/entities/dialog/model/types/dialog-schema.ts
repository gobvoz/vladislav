import { Dialog } from './dialog';

export interface DialogSchema {
  isLoading: boolean;
  error: unknown | undefined;

  list: Dialog[];
  active: Dialog | undefined;
}
