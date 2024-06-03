import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { UserProfile } from "./interfaces";

export const getUserProfileSuccess = createAction<UserProfile>(
  types.GET_USER_PROFILE_SUCCESS
);
export const getUserProfileFail = createAction<string>(
  types.GET_USER_PROFILE_FAIL
);
