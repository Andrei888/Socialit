import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { UserState } from "./interfaces";

import * as actions from "./actions";

const initialState: UserState = {
  displayName: "",
  name: "",
  email: "",
  address: "",
  age: null,
  sex: "",
  description: "",
  isProfilePublic: true,
  id: null,
  isAnonymous: true,
  accessToken: "",
  loading: false,
};

const userLoginSuccessReducer: CaseReducer<UserState> = (
  draftState,
  action
) => {
  const { displayName, email, uid, isAnonymous, accessToken } = action.payload;

  console.log(action.payload);

  draftState.displayName = displayName;
  draftState.email = email;
  draftState.id = uid;
  draftState.isAnonymous = isAnonymous;
  draftState.accessToken = accessToken;
};
const userLogoutReducer: CaseReducer = (draftState, action) => {
  draftState.displayName = "";
  draftState.email = "";
  draftState.id = null;
};

const getUserDetailsSuccessReducer: CaseReducer = (draftState, action) => {
  const { displayName, name, description, address, age, sex, isProfilePublic } =
    action.payload;

  draftState.displayName = displayName;
  draftState.name = name;
  draftState.description = description;
  draftState.address = address;
  draftState.age = age;
  draftState.sex = sex;
  draftState.isProfilePublic = isProfilePublic;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.userLoginSuccess, userLoginSuccessReducer)
    .addCase(actions.userLoginFail, userLogoutReducer)
    .addCase(actions.userLogout, userLogoutReducer)
    .addCase(actions.getUserDetailsSuccess, getUserDetailsSuccessReducer)
);

export default reducer;
