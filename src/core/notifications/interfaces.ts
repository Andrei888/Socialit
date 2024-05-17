import { ToastOptions } from "react-toastify";

export type NotifyType = "info" | "success" | "error";

export interface INotifyPayload {
  type: NotifyType;
  message: string;
}

export interface INotifyMeta {
  error?: any;
  options?: ToastOptions;
}
