import { createSelector } from "reselect";
import { FriendsState } from "./interfaces";

const selectUserInformation = (state: any) => state.user as FriendsState;

export const isLoading = createSelector(
  selectUserInformation,
  (state) => state.loading
);

export const getFriends = createSelector(
  selectUserInformation,
  (state) => state.friends
);

export const getFriendsInitialRequest = createSelector(
  selectUserInformation,
  (state) => state.initialRequest
);

const allSelectors = {
  isLoading,
  getFriends,
  getFriendsInitialRequest,
};

export default allSelectors;
