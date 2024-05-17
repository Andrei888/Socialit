import { Middleware } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
// models
import { AppState } from "../../redux/interfaces";
// services
import NotificationService from "../../services/Notifications";
// redux
import { NOTIFY } from "./types";
import { INotifyMeta, INotifyPayload } from "./interfaces";

const notificationMiddleware: Middleware<{}, AppState> =
  (store) => (next) => (action) => {
    if (action.type === NOTIFY) {
      const { payload, meta } = action as PayloadAction<
        INotifyPayload,
        any,
        INotifyMeta
      >;
      const { type, message } = payload;
      const { error, options } = meta;

      // @ts-ignore
      NotificationService[type](message, options);

      if (error) {
        console.log(error);
      }
    } else {
      next(action);
    }
  };

export default notificationMiddleware;
