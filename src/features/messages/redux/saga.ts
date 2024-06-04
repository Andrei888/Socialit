import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
//models
import { MessagesDoc } from "./interfaces";
// redux
import * as actions from "./actions";

function* getUserGroupsSuccessSaga(action: PayloadAction<MessagesDoc>) {
  if (!action.payload) {
    yield put(actions.getUserMessagesFail("fail"));
  }
}

export default function* groupsActionsSaga() {
  yield takeLatest(actions.getUserMessagesSuccess, getUserGroupsSuccessSaga);
}
