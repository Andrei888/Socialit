export interface Friends {
  displayName: string;
  id: string;
}

export interface FriendsState {
  friends: Array<Friends> | null;
  loading: boolean;
  initialRequest: boolean;
}
