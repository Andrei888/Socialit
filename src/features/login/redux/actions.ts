import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { LoginPayload } from "./interfaces";

export const userLoginSuccess = createAction<LoginPayload>(
  types.USER_LOGIN_SUCCESS
);
export const userLoginFail = createAction<string>(types.USER_LOGIN_FAIL);

export const userLogout = createAction(types.USER_LOGOUT);

export const fetchUserFromStorage = createAction(types.GET_USER_FROM_STORAGE);
