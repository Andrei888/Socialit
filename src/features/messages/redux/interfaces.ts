export interface UsersMessages {
  userId: null;
  user: null;
  friend: null;
  friendId: null;
  messages: Message[] | null;
  requestUserMessages: boolean;
  latestMessages: Message[] | null;
}

export interface Message {
  text: string;
  userId: string;
  userName: string;
  msgId: string;
}

export interface MessagesDoc {
  userId: string;
  firstUser: string;
  firstUserId: string;
  secondUser: string;
  secondUserId: string;
  messages: Message[] | null;
}
