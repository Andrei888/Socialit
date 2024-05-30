import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { FriendsState, Friend } from "./interfaces";

import * as actions from "./actions";

const initialState: FriendsState = {
  usersfriends: null,
  usersFriendRequested: null,
  usersFriendRequests: null,
  loading: false,
  requestFriends: true,
};

const getUserFriendsReducer: CaseReducer<FriendsState> = (
  draftState,
  action
) => {
  const friendsList = action.payload;

  draftState.usersfriends = friendsList.filter(
    (friend: Friend) => friend.isAccepted && friend.isVerified
  );
  draftState.usersFriendRequested = friendsList.filter(
    (friend: Friend) => friend.isAccepted && !friend.isVerified
  );

  draftState.usersFriendRequests = friendsList.filter(
    (friend: Friend) => !friend.isAccepted && friend.isVerified
  );

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
