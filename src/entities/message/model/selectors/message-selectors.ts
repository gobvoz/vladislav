import { StateSchema } from 'app/providers/store-provider';

export const getMessageList = (state: StateSchema) => state.message?.list || [];
export const getLastMessage = (state: StateSchema) => state.message?.last || null;

export const getMessageError = (state: StateSchema) => state.message?.list || null;
