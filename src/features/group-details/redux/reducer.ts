import { createReducer, CaseReducer } from "@reduxjs/toolkit";
import { GroupState } from "./interfaces";

import * as actions from "./actions";

const initialState: GroupState = {
  id: null,
  seo: null,
  name: null,
  description: null,
  chat: null,
  users: null,
  author: null,
  authorId: null,
  requestGroupInfo: true,
  isDisabled: undefined,
};

const getGroupInfoSuccessReducer: CaseReducer<GroupState> = (
  draftState,
  action
) => {
  const {
    id,
    seo,
    name,
    description,
    users,
    chat,
    author,
    authorId,
    isDisabled,
  } = action.payload;
  draftState.id = id;
  draftState.seo = seo;
  draftState.name = name;
  draftState.description = description;
  draftState.users = users;
  draftState.chat = chat;
  draftState.author = author;
  draftState.authorId = authorId;
  draftState.isDisabled = isDisabled;
  draftState.requestGroupInfo = false;
};
const updateGroupInfoReducer: CaseReducer = (draftState, action) => {
  draftState.requestGroupInfo = true;
};

const reducer = createReducer(initialState, (builder: any) =>
  builder
    .addCase(actions.getGroupInfoSuccess, getGroupInfoSuccessReducer)
    .addCase(actions.updateGroupInfo, updateGroupInfoReducer)
);

export default reducer;
