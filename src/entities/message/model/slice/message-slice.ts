import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageSchema } from '../types/message-schema';
import { Message } from '../types/message';

const initialState: MessageSchema = {
  isLoading: false,
  error: undefined,
  list: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      if (message.isReplay && message.replayTo?.id) {
        const replayTo = state.list.find(item => item.id === message.replayTo?.id);

        if (replayTo) {
          message.replayTo.text = replayTo.text;
          message.replayTo.userName = replayTo.userName;
        } else {
          message.replayTo = undefined;
        }

        message.replayTo = replayTo;
      }
      state.list.push(message);
    },
  },
});

export const { actions: messageActions } = messageSlice;
export const { reducer: messageReducer } = messageSlice;
