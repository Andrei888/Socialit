import { useInjectReducer, useInjectSaga } from "redux-injectors";
//import AuthReducer, { saga as AuthSaga } from "@redux/saga";
import {
  default as groupsReducer,
  saga as sagas,
} from "@app/features/group-details/redux";

const useInjectGroupDetails = () => {
  useInjectReducer({
    key: "groupDetails",
    reducer: groupsReducer,
  });

  useInjectSaga({
    key: "groupDetails",
    saga: sagas,
  });
};

export default useInjectGroupDetails;
