import * as yup from "yup";

export const EditionValidation = yup.object().shape({
  name: yup.string().required("required"),
  collectionId: yup.number(),
});

export default EditionValidation;