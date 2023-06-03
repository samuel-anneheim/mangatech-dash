import * as yup from "yup";

export const UserValidation = yup.object().shape({
  email: yup.string().email("email is not valid").required("required"),
  password: yup.string(),
  role: yup.string().matches(/user|admin/, "role is not valid").required("required"),
  name: yup.string(),
  surname:yup.string(),
  gender: yup.string().matches(/homme|femme|autre/, "gender is not valid").nullable(),
  pciture: yup.string().nullable(),
  dateOfBirth: yup.string().nullable(),
});
