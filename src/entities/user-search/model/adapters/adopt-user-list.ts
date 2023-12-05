import { Api } from 'telegram';

import { User } from '../types/user';

export const adoptUser = (user: Api.User): User => {
  return {
    id: (user.id || '').toString(),
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    username: user.username || '',
  };
};
