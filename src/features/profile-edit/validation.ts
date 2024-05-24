import * as yup from "yup";

// models
import { ProfileValues } from "./interfaces";

const validationSchema = yup.object<ProfileValues>({
  displayName: yup.string().required("Display Name is required!"),
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .required("Name is required!")
    .email("Invalid Email Address!"),
});

export default validationSchema;
