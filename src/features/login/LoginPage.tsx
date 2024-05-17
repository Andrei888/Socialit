import React, { useMemo } from "react";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import { Formik } from "formik";
import { Button, Row, Col } from "antd";

import { Styled } from "./LoginPage.styled";

const LoginPage: React.FC = () => {
  const handleSubmit = (values: any, actions: any) => {};
  return (
    <>
      <Styled.Wrapper>
        <Styled.LoginBox>
          <Row>
            <Col span={12}>
              <Formik
                initialValues={{ user: "", password: "" }}
                onSubmit={handleSubmit}
                render={() => (
                  <Form>
                    <Row>
                      <Input name="user" placeholder="First Name" />
                    </Row>
                    <Row>
                      <Input name="password" placeholder="Password" />
                    </Row>
                    <SubmitButton name="Submit">Submit</SubmitButton> or{" "}
                    <ResetButton>Reset Fields</ResetButton>
                  </Form>
                )}
              />
            </Col>
            <Col span={12}>
              <Button>Login with Google</Button>
            </Col>
          </Row>
        </Styled.LoginBox>
      </Styled.Wrapper>
    </>
  );
};

export default LoginPage;
