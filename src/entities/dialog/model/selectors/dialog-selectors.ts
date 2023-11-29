import { StateSchema } from 'app/providers/store-provider';

export const getDialogList = (state: StateSchema) => state.dialog?.list || [];
export const getDialogError = (state: StateSchema) => state.dialog?.error || null;
export const getActiveDialog = (state: StateSchema) => state.dialog?.active || null;
