import { createSelector } from "reselect";
import { FriendsState } from "./interfaces";

const selectUserInformation = (state: any) => state.friends as FriendsState;

export const isLoading = createSelector(
  selectUserInformation,
  (state) => state.loading
);

export const getFriends = createSelector(
  selectUserInformation,
  (state) => state.usersfriends
);

export const getRequestFriends = createSelector(
  selectUserInformation,
  (state) => state.requestFriends
);

const allSelectors = {
  isLoading,
  getFriends,
  getRequestFriends,
};

export default allSelectors;
