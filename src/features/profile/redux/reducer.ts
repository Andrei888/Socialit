import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { UserProfile } from "./interfaces";

import * as actions from "./actions";

const initialState: UserProfile = {
  id: null,
  displayName: null,
  avatar: null,
  age: null,
  sex: null,
  description: null,
};

const getUserProfileSuccessReducer: CaseReducer<UserProfile> = (
  draftState,
  action
) => {
  const { id, displayName, avatar, age, sex, description } = action.payload;

  draftState.id = id;
  draftState.displayName = displayName;
  draftState.avatar = avatar;
  draftState.age = age;
  draftState.sex = sex;
  draftState.description = description;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder.addCase(actions.getUserProfileSuccess, getUserProfileSuccessReducer)
);

export default reducer;
