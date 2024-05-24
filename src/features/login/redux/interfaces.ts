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
  name: string;
  email: string;
  id: string | null;
  description: string;
  age: number | null;
  sex: string;
  address: string;
  isAnonymous?: boolean;
  accessToken?: string;
  loading: boolean;
}
