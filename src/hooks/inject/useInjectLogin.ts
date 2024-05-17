import { useInjectReducer, useInjectSaga } from "redux-injectors";
//import AuthReducer, { saga as AuthSaga } from "@redux/saga";
import { default as loginReducer, saga as sagas } from "@features/login/redux";

const useInjectLogin = () => {
  useInjectReducer({
    key: "login",
    reducer: loginReducer,
  });
  //   useInjectSaga({
  //     key: "auth",
  //     saga: AuthSaga,
  //   });
  useInjectSaga({
    key: "login",
    saga: sagas,
  });
};

export default useInjectLogin;
