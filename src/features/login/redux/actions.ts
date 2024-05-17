import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { LoginPayload } from "./interfaces";

export const userLogin = createAction(
  types.USER_LOGIN,
  (login?: LoginPayload, callback?: any) => ({
    payload: login,
    meta: callback,
  })
);
export const userLoginSuccess = createAction<string>(types.USER_LOGIN_SUCCESS);
export const userLoginFail = createAction<string>(types.USER_LOGIN_FAIL);
