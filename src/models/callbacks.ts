export interface SuccessErrorCallback<T = any> {
  (success: T | null, error?: string): void;
}
