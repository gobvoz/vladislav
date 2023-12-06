import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WatchDogSchema } from '../types/watch-dog-schema';
import { Message } from '../types/message';
import { User } from 'entities/user-search';
import { Dialog } from 'entities/dialog';

const initialState: WatchDogSchema = {
  isLoading: false,
  error: undefined,

  isWatch: false,

  user: null,
  channel: null,
  list: [],
};

const watchDogSlice = createSlice({
  name: 'watchDog',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      state.list.push(message);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      const messages = action.payload;
      state.list = messages;
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setChannel: (state, action: PayloadAction<Dialog>) => {
      state.channel = action.payload;
    },
    setWatch: (state, action: PayloadAction<boolean>) => {
      state.isWatch = action.payload;
    },
    clear: () => initialState,
  },
});

export const { actions: watchDogActions } = watchDogSlice;
export const { reducer: watchDogReducer } = watchDogSlice;
