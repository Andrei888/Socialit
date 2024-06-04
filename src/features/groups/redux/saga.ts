import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
//models
import { Group } from "./interfaces";
// redux
import * as actions from "./actions";

function* getUserGroupsSuccessSaga(action: PayloadAction<Group[]>) {
  if (!action.payload) {
    yield put(actions.getUserGroupsFail("faild"));
  }
}

export default function* groupsActionsSaga() {
  yield takeLatest(actions.getUserGroupsSuccess, getUserGroupsSuccessSaga);
}
