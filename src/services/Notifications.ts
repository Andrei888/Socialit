import { toast, ToastOptions } from "react-toastify";
import { merge } from "lodash";

class NotificationService {
  private static defaultSettings: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
  };

  public static forceLock: boolean = false;

  private static mergeSettings = (newSettings?: ToastOptions) => {
    return newSettings
      ? merge({}, NotificationService.defaultSettings, newSettings)
      : NotificationService.defaultSettings;
  };

  static success(message: string, settings?: ToastOptions) {
    if (NotificationService.forceLock) {
      return;
    }

    const toastOptions = NotificationService.mergeSettings(settings);
    const toastId = toast.error(message, toastOptions);

    setTimeout(() => {
      toast.dismiss(toastId);
    }, toastOptions.autoClose || 3000);
  }

  static warn(message: string, settings?: ToastOptions) {
    if (NotificationService.forceLock) {
      return;
    }

    toast.warn(message, this.mergeSettings(settings));
  }
}

export default NotificationService;
