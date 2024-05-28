import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { LoginPayload, UserState } from "./interfaces";

export const userLoginSuccess = createAction<LoginPayload>(
  types.USER_LOGIN_SUCCESS
);
export const userLoginFail = createAction<string>(types.USER_LOGIN_FAIL);

export const userLogout = createAction(types.USER_LOGOUT);

export const fetchUserFromStorage = createAction(types.GET_USER_FROM_STORAGE);

export const getUserDetailsSuccess = createAction<UserState>(
  types.GET_USER_DETAILS_SUCCESS
);

export const updateUserDetails = createAction(types.UPDATE_USER_DETAILS);
