import { createSelector } from "reselect";
import { MyGroups } from "./interfaces";

const selectUserInformation = (state: any) => state.usersGroups as MyGroups;

export const isLoading = createSelector(
  selectUserInformation,
  (state) => state.loading
);

export const getGroups = createSelector(
  selectUserInformation,
  (state) => state.userGroups
);

export const getRequestGroups = createSelector(
  selectUserInformation,
  (state) => {
    console.log(state);
    return state.requestGroups;
  }
);

const allSelectors = {
  isLoading,
  getGroups,
  getRequestGroups,
};

export default allSelectors;
