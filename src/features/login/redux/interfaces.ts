export interface LoginHeader {
  "X-User-Id": string;
  "X-Api-key": string;
}

export interface LoginPayload {
  displayName: string;
  email: string;
  uid: string;
  isAnonymous?: boolean;
  accessToken?: string;
}

export interface GooglePayload {
  user: LoginPayload;
}

export interface UserState {
  displayName: string;
  avatar: string;
  name: string;
  email: string;
  id: string | null;
  description: string;
  isProfilePublic: boolean;
  age: number | null;
  sex: string;
  address: string;
  isAnonymous?: boolean;
  accessToken?: string;
  friends?: Friend[] | null;
  loading: boolean;
  updateUserDetails: boolean;
}

export interface Friend {
  friendId: string | null;
  isAccepted: boolean | null;
  isVerified: boolean | null;
}
