import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { UsersMessages } from "./interfaces";

import * as actions from "./actions";

const initialState: UsersMessages = {
  messages: null,
  requestUserMessages: true,
};

const getUserMessagesSuccessReducer: CaseReducer<UsersMessages> = (
  draftState,
  action
) => {
  draftState.messages = action.payload;
  draftState.requestUserMessages = false;
};
const updateUserMessagesReducer: CaseReducer = (draftState, action) => {
  draftState.requestUserMessages = true;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.getUserMessagesSuccess, getUserMessagesSuccessReducer)
    .addCase(actions.updateUserMessages, updateUserMessagesReducer)
);

export default reducer;
