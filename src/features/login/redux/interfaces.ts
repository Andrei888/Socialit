export interface LoginHeader {
  "X-User-Id": string;
  "X-Api-key": string;
}

export interface LoginPayload {
  displayName: string;
  email: string;
  uid: string;
}

export interface GooglePayload {
  user: LoginPayload;
}

export interface UserState {
  name: string;
  email: string;
  id: string | null;
  loading: boolean;
}
