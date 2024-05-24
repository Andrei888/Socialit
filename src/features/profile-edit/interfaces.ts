type Sex = "M" | "F";

export interface ProfileValues {
  displayName?: string;
  name?: string;
  email?: string;
  description?: string;
  age?: number | null;
  sex?: string | null;
  address?: string;
}
