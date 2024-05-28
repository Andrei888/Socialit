import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import queryString from "query-string";
//models
import { LoginPayload } from "./interfaces";
// constants
import appRoutes from "@constants/routes";
// utils
import JWTStore from "../../../storage/localStorage/jwtStorage";
import { pageLocation } from "@utils/page";
// redux
import * as actions from "./actions";

function* userLoginSuccessSaga(action: PayloadAction<LoginPayload>) {
  const { displayName, email, uid, isAnonymous, accessToken } = action.payload;

  const user = {
    displayName: displayName,
    email,
    id: uid,
    isAnonymous: isAnonymous,
    accessToken: accessToken,
  };

  JWTStore.setJWT(queryString.stringify(user));

  if (pageLocation() === "login") {
    yield put(push(appRoutes.home));
  }
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
        accessToken: jwtUser.accessToken as string,
        isAnonymous: jwtUser.isAnonymous === "true" ? true : false,
      } as LoginPayload;

      yield put(actions.userLoginSuccess(user));
    }
  }
}

export default function* loginActionsSaga() {
  yield takeLatest(actions.userLoginSuccess, userLoginSuccessSaga);
  yield takeLatest(actions.userLogout, userLogoutSaga);
  yield takeLatest(actions.fetchUserFromStorage, fetchUserFromStorageSaga);
}
