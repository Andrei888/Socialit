import * as yup from "yup";

// models
import { NewGroupValues } from "./interfaces";

const validationSchema = yup.object<NewGroupValues>({
  name: yup.string().required("Name is Required"),
  seo: yup
    .string()
    .required("SEO is Required")
    .test("testEmptySpaces", "SEO should not contain empty Spaces", (value) => {
      console.log(value);
      return typeof value === "string" && !value.includes(" ");
    }),
  description: yup.string().required("Description is Required"),
});

export default validationSchema;
