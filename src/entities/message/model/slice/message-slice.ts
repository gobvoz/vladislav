import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageSchema } from '../types/message-schema';
import { Message } from '../types/message';

const initialState: MessageSchema = {
  isLoading: false,
  error: undefined,
  list: [],
  last: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      state.list.push(message);
      state.last = message;
    },
    setMessageList: (state, action: PayloadAction<Message[]>) => {
      const messages = action.payload;

      state.list = messages.reverse();
    },
    markDeleted: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      state.list.forEach(item => {
        if (ids.includes(item.id)) {
          item.isDeleted = true;
        }
        if (item.replayTo && ids.includes(item.replayTo.id)) {
          item.replayTo.isDeleted = true;
        }
      });
    },
    clear: () => initialState,
  },
});

export const { actions: messageActions } = messageSlice;
export const { reducer: messageReducer } = messageSlice;
