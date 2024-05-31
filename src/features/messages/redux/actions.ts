import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { MessagesDoc, Message } from "./interfaces";

export const getUserMessagesSuccess = createAction<MessagesDoc>(
  types.GET_USER_MESSAGES_SUCCESS
);
export const getUserMessagesFail = createAction<string>(
  types.GET_USER_MESSAGES_FAIL
);

export const updateUserMessages = createAction(types.UPDATE_USER_MESSAGES);

export const getLatestMessagesSuccess = createAction<Message[]>(
  types.GET_LATEST_MESSAGES_SUCCESS
);
