export interface UsersMessages {
  messages: Messages[] | null;
  requestUserMessages: boolean;
}

export interface Messages {
  text: string;
  userId: string;
  userName: string;
  msgId: string;
}
