import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DialogSchema } from '../types/dialog-schema';
import { Dialog } from '../types/dialog';

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
  },
});

export const { actions: dialogActions } = dialogSlice;
export const { reducer: dialogReducer } = dialogSlice;
