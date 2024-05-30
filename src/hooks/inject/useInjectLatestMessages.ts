import { useInjectReducer, useInjectSaga } from "redux-injectors";
//import AuthReducer, { saga as AuthSaga } from "@redux/saga";
import {
  default as groupsReducer,
  saga as sagas,
} from "@app/features/groups/redux";

const useInjectLogin = () => {
  useInjectReducer({
    key: "latestMessages",
    reducer: groupsReducer,
  });

  useInjectSaga({
    key: "latestMessages",
    saga: sagas,
  });
};

export default useInjectLogin;
