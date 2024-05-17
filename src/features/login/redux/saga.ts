import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import { LoginPayload } from "./interfaces";
import { SuccessErrorCallback } from "@models/callbacks";

import * as actions from "./actions";

export function* loginSaga(
  action: PayloadAction<LoginPayload, any, SuccessErrorCallback>
) {}

export default function* loginActionsSaga() {
  yield takeLatest(actions.userLogin, loginSaga);
}
