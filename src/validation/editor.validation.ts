import * as yup from "yup";

export const EditorValidation = yup.object().shape({
  name: yup.string().required("required"),
  logo: yup.string().nullable(),
  description: yup.string().nullable(),
  officialWebsite: yup.string().nullable(),
});

export default EditorValidation;