export interface Message {
  id: number;
  isReplay: boolean;
  replayTo?: {
    id: number;
    text: string;
    userName: string;
    isDeleted?: boolean;
  };
  isPrivate: boolean;
  text: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
  userName: string;
  userLogin: string;
  channelId: string;
  isDeleted?: boolean;
}
