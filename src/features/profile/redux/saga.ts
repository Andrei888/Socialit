import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
//models
import { UserProfile } from "./interfaces";
// redux
import * as actions from "./actions";

function* getUserProfileSuccessSaga(action: PayloadAction<UserProfile>) {
  if (!action.payload) {
    yield put(actions.getUserProfileFail("fail"));
  }
}

export default function* groupsActionsSaga() {
  yield takeLatest(actions.getUserProfileSuccess, getUserProfileSuccessSaga);
}
