import { NavigateOptions, To } from 'react-router-dom';
import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { MessageSchema } from 'entities/message';
import { DialogSchema } from 'entities/dialog';
import { UserSearchSchema } from 'entities/user-search';
import { WatchDogSchema } from 'entities/watch-dog';

export interface StateSchema {
  empty?: null;
  // async reducers
  message?: MessageSchema;
  dialog?: DialogSchema;
  userSearch?: UserSearchSchema;
  watchDog?: WatchDogSchema;
}

export type StateSchemaKeys = keyof StateSchema;

export interface ReducerManager {
  getMountedReducerList: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKeys, reducer: Reducer) => void;
  remove: (key: StateSchemaKeys) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArgument {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkApiConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgument;
  state: StateSchema;
}
