import * as yup from "yup";

export const VolumeValidation = yup.object().shape({
  title: yup.string().required("required"),
  number: yup.number().required("required"),
  releaseDate: yup.string().nullable(),
  image: yup.string(),
  resume: yup.string().nullable(),
  nbrPages: yup.number().nullable(),
  price: yup.number().nullable(),
  visibility: yup.boolean(),
  followNumber: yup.number().nullable(),
  editionId: yup.number().nullable(),
});
