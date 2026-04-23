export interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  avatar?: string;
}