import { FC, useState, useRef } from "react";
import { Button } from "antd";
import { Formik, FormikProps } from "formik";
import { Form, Input, ResetButton } from "formik-antd";
import { useDispatch } from "react-redux";
// models
import { SignUpFormValues } from "./interfaces";
import { GooglePayload } from "./redux/interfaces";
//utils
import {
  createUserFirebase,
  createUserDocumentFromAuth,
} from "../../externalFeeds/firebase.utils";
// redux
import { userLoginSuccess } from "./redux/actions";

import { Styled } from "./LoginPage.styled";

import { signUpSchema } from "./validation";

const SignUpForm: FC = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<string | null>(null);
  const formRef = useRef<FormikProps<SignUpFormValues> | null>(null);

  const handleSubmitForm = (values: SignUpFormValues) => {
    setErrors("");

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

  const submitToFirebase = async (values: SignUpFormValues) => {
    try {
      const response = await createUserFirebase(values);

      if (response && response.user) {
        const userCreated = await createUserDocumentFromAuth(response.user, {
          displayName: values.name,
        });
        console.log(userCreated);
        if (userCreated) {
          dispatch(userLoginSuccess(userCreated));
        }
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setErrors(error as string);
    }
  };
  return (
    <Styled.FormCol span={12}>
      {errors && <p>{errors}</p>}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          secondPassword: "",
        }}
        onSubmit={handleSubmitForm}
        enableReinitialize
        innerRef={(instance) => {
          formRef.current = instance;
        }}
        validationSchema={signUpSchema}
        render={() => (
          <Form>
            <Styled.FormRow>
              <Form.Item name="name">
                <Input name="name" placeholder="Name" />
              </Form.Item>
            </Styled.FormRow>
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
            <Styled.FormRow>
              <Form.Item name="secondPassword">
                <Input
                  name="secondPassword"
                  type="password"
                  placeholder="Password"
                />
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

export default SignUpForm;
