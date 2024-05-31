import { useInjectReducer, useInjectSaga } from "redux-injectors";
//import AuthReducer, { saga as AuthSaga } from "@redux/saga";
import {
  default as groupsReducer,
  saga as sagas,
} from "@app/features/messages/redux";

const useInjectMesssages = () => {
  useInjectReducer({
    key: "messages",
    reducer: groupsReducer,
  });

  useInjectSaga({
    key: "messages",
    saga: sagas,
  });
};

export default useInjectMesssages;
