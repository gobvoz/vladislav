import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';

import { api } from 'shared/api/api';

import { StateSchema, ThunkExtraArgument } from './state-schema';
import { createReducerManager } from './reducer-manager';

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject,
  navigate?: (to: To, options?: NavigateOptions) => void,
) => {
  const rootReducer: ReducersMapObject = {
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducer);

  const extraArgument: ThunkExtraArgument = {
    api: api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArgument,
        },
      }),
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
