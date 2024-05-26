import { useInjectReducer, useInjectSaga } from "redux-injectors";
//import AuthReducer, { saga as AuthSaga } from "@redux/saga";
import {
  default as friendsReducer,
  saga as sagas,
} from "@app/features/user/redux";

const useInjectLogin = () => {
  useInjectReducer({
    key: "friends",
    reducer: friendsReducer,
  });

  useInjectSaga({
    key: "friends",
    saga: sagas,
  });
};

export default useInjectLogin;
