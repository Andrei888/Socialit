import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import queryString from "query-string";
//models
import { LoginPayload } from "./interfaces";
// constants
import appRoutes from "@constants/routes";
// utils
import JWTStore from "../../../storage/localStorage/jwtStorage";
// redux
import * as actions from "./actions";

function* userLoginSuccess(action: PayloadAction<LoginPayload>) {
  const { displayName, email, uid } = action.payload;
  const user = {
    name: displayName,
    email,
    id: uid,
  };
  JWTStore.setJWT(queryString.stringify(user));
  yield put(push(appRoutes.home));
}

function* userLogoutSaga() {
  JWTStore.removeJWT();
  yield put(push(appRoutes.login));
}
function* fetchUserFromStorageSaga() {
  if (JWTStore.exists()) {
    const jwt = JWTStore.getJWT();
    if (jwt) {
      const jwtUser = queryString.parse(jwt);
      const user = {
        displayName: jwtUser.displayName as string,
        email: jwtUser.email as string,
        uid: jwtUser.id as string,
      } as LoginPayload;

      yield put(actions.userLoginSuccess(user));
    }
  }
}

export default function* loginActionsSaga() {
  yield takeLatest(actions.userLoginSuccess, userLoginSuccess);
  yield takeLatest(actions.userLogout, userLogoutSaga);
  yield takeLatest(actions.fetchUserFromStorage, fetchUserFromStorageSaga);
}
