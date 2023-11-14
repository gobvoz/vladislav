import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from '../config/state-schema';
import { createReduxStore } from '../config/store';
// import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

const StoreProvider: FC<Props> = props => {
  const { children, initialState, asyncReducers } = props;

  // FIXME: useNavigate() does not work if StoreProvider outside BrowserRouter.
  // But if you put StoreProvider inside BrowserRouter, then the store is recreated every time the route changes.
  // const navigate = useNavigate();

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    // navigate,
  );

  return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };
