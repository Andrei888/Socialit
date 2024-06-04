import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
//models
import { GroupState } from "./interfaces";
// redux
import * as actions from "./actions";

function* getUserGroupsSuccessSaga(action: PayloadAction<GroupState>) {
  if (!action.payload) {
    yield put(actions.getGroupInfoFail("faild"));
  }
}

export default function* groupsActionsSaga() {
  yield takeLatest(actions.getGroupInfoSuccess, getUserGroupsSuccessSaga);
}
