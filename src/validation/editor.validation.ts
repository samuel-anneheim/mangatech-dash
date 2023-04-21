import * as yup from "yup";

export const EditorValidation = yup.object().shape({
  name: yup.string().required("required"),
  logo: yup.string(),
  description: yup.string(),
  officialWebsite: yup.string(),
});

export default EditorValidation;