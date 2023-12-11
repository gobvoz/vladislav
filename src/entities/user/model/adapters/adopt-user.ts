import { formatUserName } from 'shared/libs/format-user-name';
import { User } from '../types/user';

export const adoptUser = (user: any): User => {
  return {
    id: user.id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    title: formatUserName(user),
  };
};

export const adoptUserList = (userList: any[]): User[] => {
  return userList.map(adoptUser) as User[];
};
