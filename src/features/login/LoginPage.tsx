import React, { useState } from "react";
import { Button, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";

// redux
import { getUser } from "./redux/selectors";
import { userLogout } from "./redux/actions";

// components
import GoogleLogin from "./GoogleLogin";
import { Styled } from "./LoginPage.styled";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [signinTab, setSigninTab] = useState<boolean>(true);

  const handleUserLogout = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <Styled.Wrapper>
        <Styled.LoginBox>
          {user.email ? (
            <Styled.LogOutBox>
              <Button onClick={handleUserLogout}>Logout</Button>
            </Styled.LogOutBox>
          ) : (
            <>
              <Styled.TabHeader>
                <Button
                  onClick={(e) => setSigninTab(true)}
                  disabled={signinTab}
                >
                  Sign In
                </Button>{" "}
                or{" "}
                <Button
                  onClick={(e) => setSigninTab(false)}
                  disabled={!signinTab}
                >
                  Sign Up
                </Button>
              </Styled.TabHeader>
              <Row>
                {signinTab ? (
                  <>
                    <SignInForm />
                    <Styled.FormCol span={12}>
                      <GoogleLogin />
                    </Styled.FormCol>
                  </>
                ) : (
                  <SignUpForm />
                )}
              </Row>
            </>
          )}
        </Styled.LoginBox>
      </Styled.Wrapper>
    </>
  );
};

export default LoginPage;
