import { Dialog } from 'entities/dialog';
import { User } from 'entities/user';

export interface WatchDog {
  id: number;
  channelList: Dialog[];
  userList: User[];
  isWatch: boolean;
}
