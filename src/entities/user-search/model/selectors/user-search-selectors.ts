import { StateSchema } from 'app/providers/store-provider';

export const getList = (state: StateSchema) => state.userSearch?.list || [];
export const getQuery = (state: StateSchema) => state.userSearch?.query || '';
