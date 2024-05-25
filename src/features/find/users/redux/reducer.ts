import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { FriendsState } from "./interfaces";

import * as actions from "./actions";

const initialState: FriendsState = {
  friends: null,
  loading: false,
  initialRequest: false,
};

const getUserFriendsReducer: CaseReducer<FriendsState> = (
  draftState,
  action
) => {
  console.log(action.payload);
  if (action.payload) {
    draftState.friends = action.payload;
  }
  draftState.loading = false;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder.addCase(actions.getUserFriends, getUserFriendsReducer)
);

export default reducer;
