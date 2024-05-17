import { FC } from "react";
import { Button } from "antd";
import {
  signWithGoogleInWithPopup,
  createUserDocumentFromAuth,
} from "../../externalFeeds/firebase.utils";

const Login: FC = () => {
  const signIn = async () => {
    const { user } = await signWithGoogleInWithPopup();
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
