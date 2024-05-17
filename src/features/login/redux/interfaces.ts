export interface LoginHeader {
  "X-User-Id": string;
  "X-Api-key": string;
}

export interface LoginPayload {
  header: LoginHeader;
}

export interface UserState {
  userName: string;
  userEmail: string;
}
