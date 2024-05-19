import { FC } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

// utils
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../externalFeeds/firebase.utils";
import { userLoginSuccess } from "./redux/actions";

const GoogleLogin: FC = () => {
  const dispatch = useDispatch();

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    const user = await createUserDocumentFromAuth(response.user);

    if (user) {
      dispatch(userLoginSuccess(user));
    }
  };
  return (
    <div>
      <Button onClick={logGoogleUser}>Sign In with Google</Button>
    </div>
  );
};

export default GoogleLogin;
