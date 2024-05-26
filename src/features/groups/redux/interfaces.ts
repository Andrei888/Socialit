export interface Group {
  id: string;
  name: string;
  seo: string;
  chat: Messages[] | null;
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
