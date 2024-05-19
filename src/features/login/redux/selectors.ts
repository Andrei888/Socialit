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
}));

export const userLoaded = createSelector(selectUserInformation, (state) => {
  console.log(state);
  if (state.email) {
    return true;
  } else {
    return false;
  }
});

const allSelectors = {
  isLoading,
  getUser,
  userLoaded,
};

export default allSelectors;
