import * as yup from "yup";

// models
import { NewGroupValues } from "./interfaces";

const validationSchema = yup.object<NewGroupValues>({
  name: yup.string().required("Name is Required"),
  seo: yup.string().required("SEO is Required"),
  description: yup.string().required("Description is Required"),
});

export default validationSchema;
