import * as yup from "yup";

export const TagValidation = yup.object().shape({
  name: yup.string().required("required"),
});