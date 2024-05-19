import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectors, actions } from "@features/login/redux";
import useShouldFetch from "../useShouldFetch";

const useInitUser = () => {
  const shouldFetch = !useSelector(selectors.userLoaded);
  const dispatch = useDispatch();
  console.log(shouldFetch);
  const fetchUsers = useCallback(
    () => dispatch(actions.fetchUserFromStorage()),
    [dispatch]
  );

  useShouldFetch(shouldFetch, fetchUsers);
};

export default useInitUser;
