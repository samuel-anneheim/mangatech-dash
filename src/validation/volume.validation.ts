import * as yup from "yup";

export const VolumeValidation = yup.object().shape({
  title: yup.string().required("required"),
  number: yup.number().required("required"),
  releaseDate: yup.string(),
  image: yup.string(),
  resume: yup.string(),
  nbrPages: yup.number(),
  price: yup.number(),
  visibility: yup.boolean(),
  followNumber: yup.number(),
  editionId: yup.number(),
});
