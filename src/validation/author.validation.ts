import * as yup from "yup";

export const AuthorValidation = yup.object().shape({
  name: yup.string().required("required"),
  surname:yup.string().required("required"),
  gender: yup.string().matches(/homme|femme|autre/, "gender is not valid").nullable(),
  image: yup.string().nonNullable(),
  biography: yup.string().nullable(),
  dateOfBirth: yup.string().nullable(),
});
