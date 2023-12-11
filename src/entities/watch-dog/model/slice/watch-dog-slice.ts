import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WatchDogSchema } from '../types/watch-dog-schema';
import { User } from 'entities/user';
import { Dialog } from 'entities/dialog';
import { WatchDog } from '../types/watch-dog';

const initialState: WatchDogSchema = {
  isLoading: false,
  error: undefined,

  selectedChannels: [],
  selectedUsers: [],

  list: [],
  maxId: 0,
};

const watchDogSlice = createSlice({
  name: 'watchDog',
  initialState,
  reducers: {
    setWatchDogList: (state, action: PayloadAction<WatchDog[]>) => {
      const watchDogList: WatchDog[] = action.payload;

      state.list = watchDogList;
      state.maxId = watchDogList.length > 0 ? Math.max(...watchDogList.map(item => item.id)) : 0;
    },
    addWatchDog: (state, _: PayloadAction<void>) => {
      const watchDog: WatchDog = {} as WatchDog;
      watchDog.id = state.maxId + 1;
      watchDog.channelList = state.selectedChannels;
      watchDog.userList = state.selectedUsers;

      state.maxId = watchDog.id;

      state.list.push(watchDog);
    },
    removeWatchDog: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.list = state.list.filter(item => item.id !== id);
    },
    editWatchDog: (state, action: PayloadAction<WatchDog>) => {
      const watchDog = action.payload;
      const index = state.list.findIndex(item => item.id === watchDog.id);
      state.list[index] = watchDog;
    },
    setSelectedChannels: (state, action: PayloadAction<Dialog[]>) => {
      const channels = action.payload;
      state.selectedChannels = channels;
    },
    setSelectedUsers: (state, action: PayloadAction<User[]>) => {
      const users = action.payload;
      state.selectedUsers = users;
    },
    clear: () => initialState,
  },
});

export const { actions: watchDogActions } = watchDogSlice;
export const { reducer: watchDogReducer } = watchDogSlice;
