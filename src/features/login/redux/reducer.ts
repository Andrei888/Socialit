import { createReducer } from "@reduxjs/toolkit";
import { UserState } from "./interfaces";

import * as actions from "./actions";
import { CaseReducer } from "@reduxjs/toolkit";

const initialState: UserState = {
  userName: "",
  userEmail: "",
};

const userLoginSuccessReducer: CaseReducer<string> = (draftState, action) => {
  console.log("test");
};

const reducer = createReducer(initialState, (builder: any) =>
  builder.addCase(actions.userLoginSuccess, userLoginSuccessReducer)
);

export default reducer;
