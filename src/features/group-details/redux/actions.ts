import { createAction } from "@reduxjs/toolkit";
import * as types from "./types";

import { Group } from "./interfaces";

export const getGroupInfoSuccess = createAction<Group>(
  types.GET_GROUP_INFO_SUCCESS
);
export const getGroupInfoFail = createAction<string>(types.GET_GROUP_INFO_FAIL);

export const updateGroupInfo = createAction(types.UPDATE_GROUP_INFO);
