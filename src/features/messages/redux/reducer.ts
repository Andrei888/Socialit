import { createReducer, CaseReducer, Action } from "@reduxjs/toolkit";
import { UsersMessages, MessagesDoc } from "./interfaces";

import * as actions from "./actions";

const initialState: UsersMessages = {
  userId: null,
  user: null,
  friend: null,
  friendId: null,
  messages: null,
  latestMessages: null,
  requestUserMessages: true,
};

const getUserMessagesSuccessReducer: CaseReducer<UsersMessages> = (
  draftState,
  action
) => {
  const { userId, firstUser, firstUserId, secondUser, secondUserId, messages } =
    action.payload;
  if (userId === firstUser) {
    draftState.friend = secondUser;
    draftState.friendId = secondUserId;
  } else {
    draftState.friend = firstUser;
    draftState.friendId = firstUserId;
  }
  draftState.messages = messages;
  draftState.requestUserMessages = false;
};
const updateUserMessagesReducer: CaseReducer = (draftState, action) => {
  draftState.requestUserMessages = true;
};
const getLatestMessagesSuccessReducer: CaseReducer = (draftState, action) => {
  console.log(action.payload);
  draftState.latestMessages = action.payload;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.getUserMessagesSuccess, getUserMessagesSuccessReducer)
    .addCase(actions.updateUserMessages, updateUserMessagesReducer)
    .addCase(actions.getLatestMessagesSuccess, getLatestMessagesSuccessReducer)
);

export default reducer;
