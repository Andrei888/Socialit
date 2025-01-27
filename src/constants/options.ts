import { Option } from "@models/option";

export const sexOptions: Option[] = [
  { value: null, label: "Undefined" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const groupSearchFields: Option[] = [
  { value: "title", label: "Title" },
  { value: "description", label: "Description" },
  { value: "messages", label: "Messages in group" },
];
