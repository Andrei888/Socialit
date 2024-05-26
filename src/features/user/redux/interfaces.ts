export interface Friend {
  displayName: string;
  id: string;
}

export interface FriendsState {
  usersfriends: Array<Friend> | null;
  loading: boolean;
  requestFriends: boolean;
}
