type Sex = "M" | "F";

export interface ProfileValues {
  displayName: string;
  name: string;
  email: string;
  description: string;
  isProfilePublic: Boolean;
  age: number | null;
  sex: string | null;
  address: string;
}
