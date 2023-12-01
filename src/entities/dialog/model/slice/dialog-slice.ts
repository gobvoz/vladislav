import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DialogSchema } from '../types/dialog-schema';
import { Dialog } from '../types/dialog';
import { byPinnedDate } from 'shared/libs/comparators/by-pinned-date';

const initialState: DialogSchema = {
  isLoading: false,
  error: undefined,

  list: [],
  active: undefined,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialogList: (state, action: PayloadAction<Dialog[]>) => {
      state.list = action.payload;
    },
    setActiveDialog: (state, action: PayloadAction<Dialog>) => {
      state.active = action.payload;
    },
    /**
     * The `updateDialog` reducer updates a dialog in the dialog list and reorders the list based on the `byPinnedDate` comparator.
     *
     * @param {Object} state - The current state of the dialog slice.
     * @param {Object} action - The dispatched action.
     * @param {unknown} action.payload - The payload of the action. It should be a dialog object with the same structure as the `Dialog` type, but it's marked as `unknown` for type safety. It should be cast to `Partial<Dialog>` before use.
     *
     * The reducer first finds the index of the dialog in the dialog list that has the same `id` as the `id` of the `dialog` object in the payload.
     * If no such dialog is found (i.e., `index` is `-1`), the reducer returns without making any changes.
     * Otherwise, it updates the `date` and `message` properties of the found dialog with the values from the `dialog` object in the payload. If these values are not provided in the payload, `date` is set to `0` and `message` is set to an empty string.
     * After updating the dialog, the reducer reorders the dialog list based on the `byPinnedDate` comparator. It moves the updated dialog towards the beginning of the list until it finds a dialog that should come before the updated dialog according to the `byPinnedDate` comparator.
     */
    updateDialog: (state, action: PayloadAction<unknown>) => {
      const dialog = action.payload as Partial<Dialog>;
      const list = state.list;

      const index = list.findIndex(item => item.id === dialog.id);

      if (index === -1) {
        return;
      }

      const updatedDialog = list[index];
      updatedDialog.date = dialog.date || 0;
      updatedDialog.message = dialog.message || '';

      for (let i = index; i > 0; i--) {
        if (byPinnedDate(updatedDialog, list[i - 1]) <= 0) {
          list[i] = list[i - 1];
        } else {
          list[i] = updatedDialog;
          break;
        }
      }
    },
  },
});

export const { actions: dialogActions } = dialogSlice;
export const { reducer: dialogReducer } = dialogSlice;
