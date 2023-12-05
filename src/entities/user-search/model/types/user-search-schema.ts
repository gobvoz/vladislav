import { User } from './user';

export interface UserSearchSchema {
  isLoading: boolean;
  error: string | undefined;

  query: string;
  list: User[];
}
