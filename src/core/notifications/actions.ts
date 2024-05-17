import { createAction } from "@reduxjs/toolkit";
import { NOTIFY } from "./types";
import { NotifyType, INotifyMeta } from "./interfaces";

export const notifyActions = createAction(
  NOTIFY,
  (type: NotifyType, message: string, meta: INotifyMeta = {}) => ({
    payload: {
      type,
      message,
    },
    meta,
  })
);
