export interface Dialog {
  id: string;
  title: string;
  message: string | null;
  date: number;

  isArchived: boolean;
  isChannel: boolean;
  isGroup: boolean;
  isUser: boolean;
  isPinned: boolean;

  unreadCount: number;
  unreadMentionsCount: number;
}
