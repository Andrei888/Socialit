import { FC, useState } from "react";
import { Button } from "antd";

//utils
import {
  signWithGoogleInWithPopup,
  createUserDocumentFromAuth,
} from "../../externalFeeds/firebase.utils";

//redux
import { useInjectLogin } from "@hooks/inject";

const Login: FC = () => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  useInjectLogin();

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
