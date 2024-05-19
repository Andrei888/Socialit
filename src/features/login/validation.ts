import * as yup from "yup";

// models
import { LoginFormValues, SignUpFormValues } from "./interfaces";

const validationSchema = yup.object<LoginFormValues>().shape({
  email: yup
    .string()
    .required("Name is required!")
    .email("Invalid Email Address!"),
  password: yup.string().required("Password is Required"),
});

export default validationSchema;

export const signUpSchema = yup.object<SignUpFormValues>({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid Email Address!"),
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Password should have min 6 chars!"),
  secondPassword: yup
    .string()
    .required("Password is Required")
    .min(6, "Password should have min 6 chars!")
    .test("equal", "Passwords do not match!", function (v) {
      // Don't use arrow functions
      const ref = yup.ref("password");
      return v === this.resolve(ref);
    }),
});
