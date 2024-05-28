import { GroupUser } from "@app/features/group-details/redux/interfaces";

export interface Group {
  id: string;
  name: string;
  seo: string;
  description: string | null;
  chat: Messages[] | null;
  users: GroupUser[] | null;
}

export interface MyGroups {
  userGroups: Group[] | null;
  loading: boolean;
  requestGroups: boolean;
}

export interface Messages {
  text: string;
  userId: string;
}
