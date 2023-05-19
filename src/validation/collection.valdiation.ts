import * as yup from "yup";

export const CollectionValidation = yup.object().shape({
  title: yup.string().required("required"),
  image: yup.string(),
  releaseDate: yup.string().nullable(),
  resume: yup.string().nullable(),
  isFinish: yup.boolean(),
  visibility: yup.boolean(),
  followNumber: yup.number(),
  authorId: yup.number().nullable(),
  categoryId: yup.number().nullable(),
  editorId: yup.number().nullable(),
  tagsId: yup.array().of(yup.number()).nullable(),
});

export default CollectionValidation;