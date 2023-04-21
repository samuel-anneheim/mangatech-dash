import * as yup from "yup";

export const CollectionValidation = yup.object().shape({
  title: yup.string().required("required"),
  image: yup.string(),
  releaseDate: yup.string(),
  resume: yup.string(),
  isFinish: yup.boolean(),
  visibility: yup.boolean(),
  followNumber: yup.number(),
  authorId: yup.number(),
  categoryId: yup.number(),
  editorId: yup.number(),
  tags: yup.array().of(yup.number()),
});

export default CollectionValidation;