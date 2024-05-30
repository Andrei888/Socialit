import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { Messages } from "./interfaces";

export const getUserMessagesSuccess = createAction<Messages>(
  types.GET_USER_MESSAGES_SUCCESS
);
export const getUserMessagesFail = createAction<string>(
  types.GET_USER_MESSAGES_FAIL
);

export const updateUserMessages = createAction(types.UPDATE_USER_MESSAGES);
