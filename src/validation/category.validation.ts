import * as yup from "yup";

export const CategoryValidation = yup.object().shape({
  name: yup.string().required("required"),
  image: yup.string().nullable(),
  description: yup.string().nullable(),
});

export default CategoryValidation;