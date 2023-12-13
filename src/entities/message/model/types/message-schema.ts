import { Message } from './message';

export interface MessageSchema {
  isLoading: boolean;
  error: unknown | undefined;

  list: Message[];
  last: Message | null;
}
