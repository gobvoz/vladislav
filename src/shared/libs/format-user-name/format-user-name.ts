import { User } from 'entities/user';

enum NameType {
  LONG = 'LONG',
  SHORT = 'SHORT',
  USER_NAME = 'USER_NAME',
}

export const formatUserNameLong = (user: User) => {
  return [
    user.firstName,
    user.lastName,
    '(id:',
    user.id,
    ')',
    user.username ? `@${user.username}` : '',
  ].join(' ');
};

export const formatUserNameShort = (user: User) => {
  return [user.firstName, user.lastName].join(' ');
};

export const formatUserNameOnly = (user: User) => {
  return user.username ? `@${user.username}` : '';
};

export const formatUserName = (user: User, nameType?: NameType) => {
  switch (nameType) {
    case NameType.LONG:
      return formatUserNameLong(user);
    case NameType.SHORT:
      return formatUserNameShort(user);
    case NameType.USER_NAME:
      return formatUserNameOnly(user);
    default:
      return formatUserNameLong(user);
  }
};
