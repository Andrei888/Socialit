import { FC, useState, useRef, useCallback, useEffect } from "react";
import { Button } from "antd";
import { Formik, FormikProps } from "formik";
import { Form, Input, InputNumber, Radio, ResetButton } from "formik-antd";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
// models
import { ProfileValues } from "./interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
} from "../../externalFeeds/firebase.utils";
// redux
import { getUserDetailsSuccess } from "../login/redux/actions";
import { getUserDetails } from "../login/redux/selectors";
//import { userLoginSuccess } from "./redux/actions";

import { Styled } from "./ProfileForm.styled";

import validationSchema from "./validation";
import { UserState } from "../login/redux/interfaces";

const { Text, Title } = Typography;

const ProfileForm: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserDetails);

  const [errors, setErrors] = useState<string | null>(null);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const formRef = useRef<FormikProps<ProfileValues> | null>(null);

  const handleSubmitForm = (values: ProfileValues) => {
    setErrors("");

    if (formRef.current?.isValid) {
      submitToFirebase(values);
    }
  };
  const handleSubmit = () => {
    if (formRef.current?.values) {
      handleSubmitForm(formRef.current?.values);
    }
  };

  const submitToFirebase = async (values: ProfileValues) => {
    console.log(values);
    try {
      const response = await updateUserFirebase(user, values);
      if (response) {
        setSubmittedMsg("Profile Updated Successfully!");
      }
    } catch (error) {
      console.log(error);
      setErrors(error as string);
    }
  };

  useEffect(() => {
    async function fetchDetails() {
      const userDetails = await getUserDetailsFirebase(user);
      console.log(userDetails);
      if (userDetails) {
        dispatch(
          getUserDetailsSuccess({
            displayName: userDetails.displayName,
            name: userDetails.name,
            email: userDetails.email,
            description: userDetails.description ?? "",
            age: userDetails.age,
            sex: userDetails.sex ?? "",
            address: userDetails.address ?? "",
            isProfilePublic: userDetails.isProfilePublic ?? true,
          } as UserState)
        );
      }
    }
    if (user.id) {
      fetchDetails();
    }

    // eslint-disable-line react-hooks/exhaustive-deps
  }, [user.id]);

  useEffect(() => {
    setSubmittedMsg(null);
  }, [user]);

  const initialValues = useCallback(() => {
    return {
      displayName: user.displayName,
      name: user.name,
      email: user.email,
      description: user.description ?? "",
      age: user.age,
      sex: user.sex ?? "",
      address: user.address ?? "",
      isProfilePublic: user.isProfilePublic ?? true,
    };
  }, [user]);

  return (
    <Styled.Wrapper>
      <Title>Please adjust personal informations if needed:</Title>
      {submittedMsg && (
        <p style={{ color: "#00ff00", marginBottom: "15px" }}>{submittedMsg}</p>
      )}
      {errors && <p>{errors}</p>}
      <Formik
        initialValues={initialValues()}
        onSubmit={handleSubmitForm}
        enableReinitialize
        innerRef={(instance) => {
          // @ts-ignore
          formRef.current = instance;
        }}
        validationSchema={validationSchema}
        render={() => (
          <Form>
            <Styled.FormRow>
              <Form.Item name="displayName">
                <Text>Display Name*</Text>
                <Input name="displayName" placeholder="Display Name" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="name">
                <Text>Name*</Text>
                <Input name="name" placeholder="Name" aria-label="test" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="email">
                <Text>Email*</Text>
                <Input disabled name="email" placeholder="Email" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="isProfilePublic">
                <Text>Profile Type</Text>
                <label>
                  <Radio name="isProfilePublic" value={true} />
                  Public Profile
                </label>
                <label>
                  <Radio name="isProfilePublic" value={true} />
                  Private Profile
                </label>
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="description">
                <Text>Description*</Text>
                <Input name="description" placeholder="Description" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="age">
                <Text>Age*</Text>
                <InputNumber name="age" min={0} placeholder="age" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="sex">
                <Text>Sex*</Text>
                <Input name="sex" placeholder="sex" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="address">
                <Text>Address*</Text>
                <Input name="address" placeholder="address" />
              </Form.Item>
            </Styled.FormRow>
            <div>
              <Button name="Submit" onClick={(e) => handleSubmit()}>
                Submit
              </Button>{" "}
              or <ResetButton>Reset Form</ResetButton>
            </div>
          </Form>
        )}
      />
    </Styled.Wrapper>
  );
};

export default ProfileForm;
