import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { Group } from "./interfaces";

export const getUserGroupsSuccess = createAction<Group[]>(
  types.GET_USER_GROUPS
);
export const getUserGroupsFail = createAction<string>(
  types.GET_USER_GROUPS_FAIL
);

export const findGroups = createAction(types.FIND_GROUPS);

export const updateGroupsList = createAction(types.UPDATE_GROUPS_LIST);
