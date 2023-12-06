import { StateSchema } from 'app/providers/store-provider';

export const getWatchDogUser = (state: StateSchema) => state.watchDog?.user || null;
export const getWatchDogChannel = (state: StateSchema) => state.watchDog?.channel || null;
export const getWatchDogMessages = (state: StateSchema) => state.watchDog?.list || [];

export const getWatchDogActive = (state: StateSchema) => state.watchDog?.isWatch || false;
