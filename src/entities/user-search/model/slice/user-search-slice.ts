import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSearchSchema } from '../types/user-search-schema';
import { User } from '../types/user';

const initialState: UserSearchSchema = {
  isLoading: false,
  error: undefined,

  query: '',
  list: [],
};

const userSearchSlice = createSlice({
  name: 'userSearch',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { actions: userSearchActions } = userSearchSlice;
export const { reducer: userSearchReducer } = userSearchSlice;
