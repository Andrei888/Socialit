import { FC, useState, useRef, useCallback, useEffect } from "react";
import { Button, Row, Col, Modal, Image } from "antd";
import { Formik, FormikProps } from "formik";
import {
  Form,
  InputNumber,
  Radio,
  ResetButton,
  Input,
  Select,
} from "formik-antd";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
// models
import { ProfileValues } from "./interfaces";
// constants
import { DEFAULT_AVATAR } from "@constants/placeholders";
import { sexOptions } from "@constants/options";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
} from "../../externalFeeds/firebase.utils";
// redux
import { getUserDetailsSuccess } from "../login/redux/actions";
import { getUserDetails } from "../login/redux/selectors";

// components
import { Styled } from "./ProfileForm.styled";
import ImageInput from "../image-edit/ImageInput";

import validationSchema from "./validation";
import { UserState } from "../login/redux/interfaces";

const { Text, Title } = Typography;

const ProfileForm: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserDetails);

  const [errors, setErrors] = useState<string | null>(null);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const formRef = useRef<FormikProps<ProfileValues> | null>(null);

  const handleSubmitForm = () => {
    setErrors("");

    if (formRef.current) {
      formRef.current.submitForm();
    }
  };
  const handleSubmit = () => {
    if (formRef.current?.isValid) {
      submitToFirebase(formRef.current?.values);
    }
  };

  const submitToFirebase = async (values: ProfileValues) => {
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
      if (userDetails) {
        dispatch(
          getUserDetailsSuccess({
            displayName: userDetails.displayName,
            name: userDetails.name,
            avatar: userDetails.avatar,
            email: userDetails.email,
            description: userDetails.description ?? "",
            age: userDetails.age,
            sex: userDetails.sex ?? "",
            address: userDetails.address ?? "",
            isProfilePublic: userDetails.isProfilePublic ?? true,
            isAdmin: userDetails.isAdmin ?? false,
          } as UserState)
        );
      }
    }
    if (user.id) {
      fetchDetails();
    }

    // eslint-disable-line react-hooks/exhaustive-deps
  }, [user.id, user.updateUserDetails]);

  useEffect(() => {
    if (submittedMsg) {
      setTimeout(() => {
        setSubmittedMsg(null);
      }, 2000);
    }
  }, [user, submittedMsg]);

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
        onSubmit={handleSubmit}
        enableReinitialize
        innerRef={(instance) => {
          // @ts-ignore
          formRef.current = instance;
        }}
        validationSchema={validationSchema}
        component={(item) => {
          return (
            <Form>
              <Row>
                <Col span={8}>
                  <Styled.FormRow>
                    <ImageInput user={user} />
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="displayName">
                        <Text>Display Name*</Text>
                        <Input name="displayName" placeholder="Display Name" />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="name">
                        <Text>Name*</Text>
                        <Input
                          name="name"
                          placeholder="Name"
                          aria-label="test"
                        />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="email">
                        <Text>Email*</Text>
                        <Input disabled name="email" placeholder="Email" />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                </Col>
                <Col span={14}>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="isProfilePublic">
                        <Text>Profile Type</Text>
                        <Radio.Group name="isProfilePublic">
                          <label className="label-wrap">
                            <Radio name="isProfilePublic" value={true} />
                            Public Profile
                          </label>
                          <label className="label-wrap">
                            <Radio name="isProfilePublic" value={false} />
                            Private Profile
                          </label>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="description">
                        <Text>Description</Text>
                        <Input.TextArea
                          name="description"
                          placeholder="Description"
                          rows={3}
                          maxLength={200}
                        />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="age">
                        <Text>Age</Text>
                        <InputNumber name="age" min={0} placeholder="age" />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="sex">
                        <Text>Sex</Text>
                        <Select name="sex" options={sexOptions} />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                  <Styled.FormRow>
                    <Col span={24}>
                      <Form.Item name="address">
                        <Text>Address</Text>
                        <Input name="address" placeholder="address" />
                      </Form.Item>
                    </Col>
                  </Styled.FormRow>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Button name="Submit" onClick={(e) => handleSubmitForm()}>
                    Submit
                  </Button>{" "}
                  or <ResetButton>Reset Form</ResetButton>
                </Col>
              </Row>
            </Form>
          );
        }}
      />
    </Styled.Wrapper>
  );
};

export default ProfileForm;
