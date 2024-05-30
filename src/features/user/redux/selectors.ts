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

export const getFriendsRequested = createSelector(
  selectUserInformation,
  (state) => state.usersFriendRequested
);

export const getFriendsRequests = createSelector(
  selectUserInformation,
  (state) => state.usersFriendRequests
);

export const getRequestFriends = createSelector(
  selectUserInformation,
  (state) => state.requestFriends
);

const allSelectors = {
  isLoading,
  getFriends,
  getFriendsRequested,
  getFriendsRequests,
  getRequestFriends,
};

export default allSelectors;
