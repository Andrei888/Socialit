import { createSelector } from "reselect";
import { UsersMessages } from "./interfaces";

const selectUserInformation = (state: any) => state.messages as UsersMessages;

export const getMessagesState = createSelector(
  selectUserInformation,
  (state) => {
    return {
      userId: state.userId,
      friendId: state.friendId,
      user: state.user,
      friend: state.friend,
      messages: state.messages,
    };
  }
);

export const requestMessages = createSelector(
  selectUserInformation,
  (state) => {
    return state.requestUserMessages;
  }
);
export const getLatestMessages = createSelector(
  selectUserInformation,
  (state) => {
    return state.latestMessages;
  }
);

const allSelectors = {
  getMessagesState,
  getLatestMessages,
  requestMessages,
};

export default allSelectors;
