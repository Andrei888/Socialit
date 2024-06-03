export interface LoginHeader {
  "X-User-Id": string;
  "X-Api-key": string;
}

export interface LoginPayload {
  displayName?: string;
  email?: string;
  id?: string;
  isAnonymous?: boolean;
  accessToken?: string;
  avatar?: string;
  name?: string;
  age?: number;
  sex?: string;
  isAdmin?: boolean;
  isDisabled?: boolean;
  isProfilePublic?: boolean;
  address?: string;
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
  isAdmin?: boolean;
  isDisabled?: boolean;
  updateUserDetails: boolean;
}

export interface Friend {
  id: string | null;
  name: string | null;
  isAccepted: boolean | null;
  isVerified: boolean | null;
  isDisabled?: boolean;
}
