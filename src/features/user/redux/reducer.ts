import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { FriendsState } from "./interfaces";

import * as actions from "./actions";

const initialState: FriendsState = {
  usersfriends: null,
  loading: false,
  requestFriends: true,
};

const getUserFriendsReducer: CaseReducer<FriendsState> = (
  draftState,
  action
) => {
  if (action.payload) {
    draftState.usersfriends = action.payload;
  }
  draftState.requestFriends = false;
  draftState.loading = false;
};

const updateUserFriendsReducer: CaseReducer = (draftState, action) => {
  draftState.requestFriends = true;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.getUserFriends, getUserFriendsReducer)
    .addCase(actions.updateUserFriends, updateUserFriendsReducer)
);

export default reducer;
