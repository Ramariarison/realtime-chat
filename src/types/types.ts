export interface Conversation {
  id?: number;
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  avatar?: string;
  last_message?: string;
  last_message_at?: string;
}

export interface Message {
    id: number;
    content: string;
    user_id: number;
    created_at: string;
}