import { TelegramClient } from 'telegram';
import { EntityLike } from 'telegram/define';

export const getProfileImage = async (entity: EntityLike, client: TelegramClient) => {
  try {
    const result = await client.downloadProfilePhoto(entity);

    if (!result || result?.length === 0) return '';

    const blob = new Blob([result], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.dir(error);
    return '';
  }
};
