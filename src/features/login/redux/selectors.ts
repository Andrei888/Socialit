import { createSelector } from "reselect";
import { UserState } from "./interfaces";

const selectUserInformation = (state: any) => state.user as UserState;

export const isLoading = createSelector(
  selectUserInformation,
  (state) => state.loading
);

export const getUser = createSelector(selectUserInformation, (state) => ({
  name: state.name,
  email: state.email,
  id: state.id,
  isAnonymous: state.isAnonymous,
  accessToken: state.accessToken,
}));

export const getUserBasic = createSelector(selectUserInformation, (state) => ({
  displayName: state.displayName,
  email: state.email,
  id: state.id,
}));

export const getUserDetails = createSelector(
  selectUserInformation,
  (state) => state
);

export const userLoaded = createSelector(selectUserInformation, (state) => {
  if (state.email) {
    return true;
  } else {
    return false;
  }
});

const allSelectors = {
  isLoading,
  getUser,
  getUserDetails,
  userLoaded,
};

export default allSelectors;
