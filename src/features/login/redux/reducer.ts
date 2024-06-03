import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { UserState } from "./interfaces";

import * as actions from "./actions";

const initialState: UserState = {
  displayName: "",
  avatar: "",
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
  friends: null,
  loading: false,
  isAdmin: undefined,
  isDisabled: undefined,
  updateUserDetails: true,
};

const userLoginSuccessReducer: CaseReducer<UserState> = (
  draftState,
  action
) => {
  console.log(action.payload);
  const {
    displayName,
    name,
    avatar,
    email,
    id,
    isAnonymous,
    accessToken,
    isAdmin,
    address,
    sex,
    description,
    age,
    isDisabled,
  } = action.payload;

  draftState.displayName = displayName;
  draftState.name = name;
  draftState.avatar = avatar;
  draftState.email = email;
  draftState.id = id;
  draftState.isAnonymous = isAnonymous;
  draftState.accessToken = accessToken;
  draftState.updateUserDetails = false;
  draftState.isAdmin = isAdmin;
  draftState.address = address;
  draftState.age = age;
  draftState.sex = sex;
  draftState.description = description;
  draftState.isDisabled = isDisabled;
};
const userLogoutReducer: CaseReducer = (draftState, action) => {
  draftState.displayName = "";
  draftState.email = "";
  draftState.id = null;
};

const getUserDetailsSuccessReducer: CaseReducer = (draftState, action) => {
  const {
    displayName,
    avatar,
    name,
    description,
    address,
    age,
    sex,
    isProfilePublic,
    isAdmin,
    isDisabled,
  } = action.payload;

  draftState.displayName = displayName;
  draftState.name = name;
  draftState.avatar = avatar;
  draftState.description = description;
  draftState.address = address;
  draftState.age = age;
  draftState.sex = sex;
  draftState.isProfilePublic = isProfilePublic;
  draftState.isAdmin = isAdmin;
  draftState.updateUserDetails = false;
  draftState.isDisabled = isDisabled;
};
const updateUserDetailsReducer: CaseReducer = (draftState, action) => {
  draftState.updateUserDetails = true;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.userLoginSuccess, userLoginSuccessReducer)
    .addCase(actions.userLoginFail, userLogoutReducer)
    .addCase(actions.userLogout, userLogoutReducer)
    .addCase(actions.getUserDetailsSuccess, getUserDetailsSuccessReducer)
    .addCase(actions.updateUserDetails, updateUserDetailsReducer)
);

export default reducer;
