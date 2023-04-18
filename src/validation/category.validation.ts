import * as yup from "yup";

export const CategoryValidation = yup.object().shape({
  name: yup.string().required("required"),
  image: yup.string(),
  description: yup.string(),
});

export default CategoryValidation;