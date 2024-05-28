import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import queryString from "query-string";
//models
import { Group } from "./interfaces";
// constants
import appRoutes from "@constants/routes";
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
