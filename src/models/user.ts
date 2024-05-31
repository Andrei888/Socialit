export interface User {
  email: string;
  id: string;
  password: string;
  displayName?: string;
}

export interface BasicUser {
  email: string;
  id: string | null;
  displayName?: string;
}
