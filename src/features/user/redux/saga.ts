import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import queryString from "query-string";
//models
import { Friend } from "./interfaces";
// constants
import appRoutes from "@constants/routes";
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