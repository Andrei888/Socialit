import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { UserState } from "./interfaces";

import * as actions from "./actions";

const initialState: UserState = {
  name: "",
  email: "",
  id: null,
  loading: false,
};

const userLoginSuccessReducer: CaseReducer<UserState> = (
  draftState,
  action
) => {
  const { displayName, email, uid } = action.payload;
  draftState.name = displayName;
  draftState.email = email;
  draftState.id = uid;
};
const userLogoutReducer: CaseReducer = (draftState, action) => {
  draftState.name = "";
  draftState.email = "";
  draftState.id = null;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.userLoginSuccess, userLoginSuccessReducer)
    .addCase(actions.userLoginFail, userLogoutReducer)
    .addCase(actions.userLogout, userLogoutReducer)
);

export default reducer;
