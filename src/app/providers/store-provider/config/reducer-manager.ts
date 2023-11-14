import { AnyAction, Reducer, ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import { ReducerManager, StateSchema, StateSchemaKeys } from './state-schema';

export const createReducerManager = (
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager => {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);
  let keysToRemove: StateSchemaKeys[] = [];

  return {
    getMountedReducerList: () => reducers,

    reduce: (state: StateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };

        for (const key of keysToRemove) {
          delete state[key];
        }

        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key: StateSchemaKeys, reducer: Reducer) => {
      if (!key || reducers[key]) return;

      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemaKeys) => {
      if (!key || !reducers[key]) return;

      delete reducers[key];

      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers);
    },
  };
};
