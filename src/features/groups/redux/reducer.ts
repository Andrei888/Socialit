import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { MyGroups } from "./interfaces";

import * as actions from "./actions";

const initialState: MyGroups = {
  userGroups: null,
  loading: false,
  requestGroups: true,
};

const getUserGroupsSuccessReducer: CaseReducer<MyGroups> = (
  draftState,
  action
) => {
  console.log(action.payload);

  draftState.userGroups = action.payload;
  draftState.loading = false;
  draftState.requestGroups = false;
};
const updateGroupsListReducer: CaseReducer = (draftState, action) => {
  draftState.requestGroups = true;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.getUserGroupsSuccess, getUserGroupsSuccessReducer)
    .addCase(actions.updateGroupsList, updateGroupsListReducer)
);

export default reducer;
