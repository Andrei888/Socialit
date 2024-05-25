import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { Friends, FriendsState } from "./interfaces";

export const getUserFriends = createAction<Friends[]>(types.GET_USER_FRIENDS);
export const getUserFriendsFailed = createAction<string>(
  types.GET_USER_FRIENDS_FAIL
);
