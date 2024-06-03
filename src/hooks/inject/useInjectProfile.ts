import { useInjectReducer, useInjectSaga } from "redux-injectors";
import {
  default as profileReducer,
  saga as sagas,
} from "@app/features/profile/redux";

const useInjectLogin = () => {
  useInjectReducer({
    key: "userProfile",
    reducer: profileReducer,
  });

  useInjectSaga({
    key: "userProfile",
    saga: sagas,
  });
};

export default useInjectLogin;
