import * as yup from "yup";

// models
import { ProfileValues } from "./interfaces";

const validationSchema = yup.object<ProfileValues>({
  displayName: yup.string().required("Display Name is required!"),
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid Email Address!"),
  description: yup.string(),
  isProfilePublic: yup.boolean(),
  age: yup.number(),
  sex: yup.string(),
  address: yup.string(),
});

export default validationSchema;
