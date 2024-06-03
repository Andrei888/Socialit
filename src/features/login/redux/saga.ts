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
  console.log(action.payload);
  const {
    displayName,
    email,
    id,
    isAnonymous,
    accessToken,
    isAdmin,
    isDisabled,
  } = action.payload;

  const user = {
    displayName: displayName,
    email,
    id: id,
    isAnonymous: isAnonymous,
    accessToken: accessToken,
    isAdmin: isAdmin,
    isDisabled: isDisabled,
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
        id: jwtUser.id as string,
        accessToken: jwtUser.accessToken as string,
        isAnonymous: jwtUser.isAnonymous === "true" ? true : false,
        isAdmin: jwtUser.isAdmin === "true" ? true : false,
        isDisabled: jwtUser.isDisabled === "true" ? true : false,
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
