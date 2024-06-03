export interface Friend {
  displayName: string;
  id: string;
  isAccepted: boolean;
  isVerified: boolean;
  isDisabled?: boolean;
}

export interface FriendsState {
  usersfriends: Array<Friend> | null;
  usersFriendRequested: Array<Friend> | null;
  usersFriendRequests: Array<Friend> | null;
  loading: boolean;
  requestFriends: boolean;
}
