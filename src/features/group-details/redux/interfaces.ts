export interface GroupState extends Group {
  requestGroupInfo: boolean;
}

export interface Messages {
  text: string;
  userId: string;
  userName: string;
  msgId: string;
}

export interface Group {
  id: string | null;
  name: string | null;
  seo: string | null;
  description: string | null;
  chat: Messages[] | null;
  users: GroupUser[] | null;
  author: string | null;
  authorId: string | null;
}

export interface GroupUser {
  displayName: string;
  email: string;
  id: string;
}
