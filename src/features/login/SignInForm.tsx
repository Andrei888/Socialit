import { FC, useRef } from "react";
import { Button } from "antd";
import { Formik, FormikProps } from "formik";
import { Form, Input, ResetButton } from "formik-antd";
import { useDispatch } from "react-redux";
// models
import { LoginFormValues } from "./interfaces";
import { LoginPayload } from "./redux/interfaces";
//utils
import { signInUserWithEmailAndPassword } from "../../externalFeeds/firebase.utils";
// redux
import { userLoginSuccess } from "./redux/actions";

import { Styled } from "./LoginPage.styled";

import validationSchema from "./validation";

const SignInForm: FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<LoginFormValues> | null>(null);

  const handleSubmitForm = (values: LoginFormValues) => {
    if (formRef.current?.isValid) {
      submitToFirebase(values);
    }
  };
  const handleSubmit = () => {
    //formRef.current?.submitForm();
    if (formRef.current?.values) {
      handleSubmitForm(formRef.current?.values);
    }
  };

  const submitToFirebase = async (values: LoginFormValues) => {
    try {
      const response = await signInUserWithEmailAndPassword(values);

      if (response) {
        dispatch(userLoginSuccess(response.user as LoginPayload));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.FormCol span={12}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmitForm}
        enableReinitialize
        innerRef={(instance) => {
          formRef.current = instance;
        }}
        validationSchema={validationSchema}
        render={() => (
          <Form>
            <Styled.FormRow></Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="email">
                <Input name="email" placeholder="Email" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="password">
                <Input name="password" type="password" placeholder="Password" />
              </Form.Item>
            </Styled.FormRow>
            <div style={{ textAlign: "center" }}>
              <Button name="Submit" onClick={(e) => handleSubmit()}>
                Submit
              </Button>{" "}
              or <ResetButton>Reset Form</ResetButton>
            </div>
          </Form>
        )}
      />
    </Styled.FormCol>
  );
};

export default SignInForm;
