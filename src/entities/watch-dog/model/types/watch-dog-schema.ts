import { User } from 'entities/user-search';
import { Message } from './message';
import { Dialog } from 'entities/dialog';

export interface WatchDogSchema {
  isLoading: boolean;
  error: unknown | undefined;

  isWatch: boolean;

  user: User | null;
  channel: Dialog | null;
  list: Message[];
}
