import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { Friend, FriendsState } from "./interfaces";

export const getUserFriends = createAction<Friend[]>(types.GET_USER_FRIENDS);
export const getUserFriendsFailed = createAction<string>(
  types.GET_USER_FRIENDS_FAIL
);

export const updateUserFriends = createAction(types.UPDATE_USER_FRIENDS);
