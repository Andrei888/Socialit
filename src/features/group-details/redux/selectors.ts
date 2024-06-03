import { createSelector } from "reselect";
import { GroupState } from "./interfaces";

const selectUserInformation = (state: any) => state.groupDetails as GroupState;

export const getGroup = createSelector(selectUserInformation, (state) => {
  return {
    seo: state.seo,
    name: state.name,
    id: state.id,
    description: state.description,
    chat: state.chat,
    users: state.users,
    author: state.author,
    authorId: state.authorId,
    isDisabled: state.isDisabled,
  };
});

export const requestGroupInfo = createSelector(
  selectUserInformation,
  (state) => {
    return state.requestGroupInfo;
  }
);

const allSelectors = {
  getGroup,
  requestGroupInfo,
};

export default allSelectors;
