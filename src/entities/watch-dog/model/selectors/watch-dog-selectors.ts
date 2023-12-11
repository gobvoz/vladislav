import { StateSchema } from 'app/providers/store-provider';

export const getWatchDogSelectedChannels = (state: StateSchema) =>
  state.watchDog?.selectedChannels || [];
export const getWatchDogSelectedUsers = (state: StateSchema) => state.watchDog?.selectedUsers || [];
export const getWatchDogList = (state: StateSchema) => state.watchDog?.list || [];
export const getWatchDogMaxId = (state: StateSchema) => state.watchDog?.maxId || 0;
