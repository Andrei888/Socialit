import { createSelector } from "reselect";
import { UserProfile } from "./interfaces";

const selectUserInformation = (state: any) => state.userProfile as UserProfile;

export const getUserProfile = createSelector(selectUserInformation, (state) => {
  return {
    id: state.id,
    displayName: state.displayName,
    avatar: state.avatar,
    sex: state.sex,
    description: state.description,
  };
});

const allSelectors = {
  getUserProfile,
};

export default allSelectors;
