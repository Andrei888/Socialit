import { FC, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "antd";
import { Formik, FormikProps } from "formik";
import { Form, Input, Radio, ResetButton } from "formik-antd";
import { useHistory } from "react-router-dom";
//import {PlusCircleOutlined} from  'antd/'
// models
import { NewGroupValues } from "./interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  findGroupsFirebase,
  joinGroupFirebase,
  createNewGroupFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/groups/redux";
import { getUserDetails } from "@features/login/redux/selectors";

import validationSchema from "./validation";

import { Styled } from "./CreateNewGroup.styled";

const { Text } = Typography;

const CreateNewGroup: FC = () => {
  const user = useSelector(getUserDetails);
  const [errors, setErrors] = useState<string | null>(null);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const formRef = useRef<FormikProps<NewGroupValues> | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = useCallback(() => {
    return {
      name: "",
      seo: "",
      description: "",
    };
  }, [user]);

  const handleSubmitForm = (values: NewGroupValues) => {
    setErrors("");

    console.log(formRef.current);
    if (formRef.current?.isValid) {
      submitToFirebase(values);

      if (formRef.current?.values) {
        createNewGroupFirestore(user, formRef.current?.values);
      }
    }
  };
  const handleSubmit = () => {
    console.log(formRef.current);
    formRef.current?.submitForm();
  };

  const submitToFirebase = async (values: NewGroupValues) => {
    console.log(values);
    try {
      const response = await createNewGroupFirestore(user, values);
      if (response) {
        setSubmittedMsg("New Group Successfully Created!");
        dispatch(groupAction.updateGroupsList());
        setTimeout(() => {
          history.push("/groups");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error as string);
    }
  };

  return (
    <div className="group-form">
      <Styled.Title>
        By submitting this form you will create a new Group where you will join
        automatically!
      </Styled.Title>
      {submittedMsg && <p className="success-msg">{submittedMsg}</p>}
      <Formik
        initialValues={initialValues()}
        onSubmit={handleSubmitForm}
        enableReinitialize
        innerRef={(instance) => {
          formRef.current = instance;
        }}
        validationSchema={validationSchema}
        render={() => (
          <Form>
            <Styled.FormRow>
              <Form.Item name="name">
                <Text>Group Name*</Text>
                <Input name="name" placeholder="Group Name" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="seo">
                <Text>Group SEO*</Text>
                <Input name="seo" placeholder="Seo" aria-label="test" />
              </Form.Item>
            </Styled.FormRow>
            <Styled.FormRow>
              <Form.Item name="description">
                <Text>Group Description*</Text>
                <Input.TextArea
                  showCount
                  maxLength={200}
                  name="description"
                  placeholder="Please provide descriprion, max 200 characters."
                  style={{ height: 220, resize: "none" }}
                />
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
    </div>
  );
};

export default CreateNewGroup;
