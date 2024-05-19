import { useInjectReducer, useInjectSaga } from "redux-injectors";
//import AuthReducer, { saga as AuthSaga } from "@redux/saga";
import { default as loginReducer, saga as sagas } from "@features/login/redux";

const useInjectLogin = () => {
  useInjectReducer({
    key: "user",
    reducer: loginReducer,
  });
  //   useInjectSaga({
  //     key: "auth",
  //     saga: AuthSaga,
  //   });
  useInjectSaga({
    key: "user",
    saga: sagas,
  });
};

export default useInjectLogin;
