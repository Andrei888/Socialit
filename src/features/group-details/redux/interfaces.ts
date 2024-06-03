import { Message } from "@models/messages";

export interface GroupState extends Group {
  requestGroupInfo: boolean;
}

export interface Group {
  id: string | null;
  name: string | null;
  seo: string | null;
  description: string | null;
  chat: Message[] | null;
  users: GroupUser[] | null;
  author: string | null;
  authorId: string | null;
  isDisabled?: boolean;
}

export interface GroupUser {
  displayName: string;
  email: string;
  id: string;
}
