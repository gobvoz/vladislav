import { StateSchema } from 'app/providers/store-provider';

export const getMessageList = (state: StateSchema) => state.message?.list || [];

export const getMessageError = (state: StateSchema) => state.message?.list || null;
