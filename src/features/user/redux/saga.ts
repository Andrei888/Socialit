import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
//models
import { Friend } from "./interfaces";
// redux
import * as actions from "./actions";

function* getUserFriendsSaga(action: PayloadAction<Friend[]>) {
  if (!action.payload) {
    yield put(actions.getUserFriendsFailed("faild"));
  }
}

export default function* loginActionsSaga() {
  yield takeLatest(actions.getUserFriends, getUserFriendsSaga);
}
