import { Dialog } from 'entities/dialog';
import { User } from 'entities/user';
import { WatchDog } from './watch-dog';

export interface WatchDogSchema {
  isLoading: boolean;
  error: unknown | undefined;

  selectedChannels: Dialog[];
  selectedUsers: User[];

  list: WatchDog[];
  maxId: number;
}
