import { useState } from "react";
import CategoryService from "../../api/services/Category.service";
import { Formik } from "formik";
import Header from "../../components/Header";
import AlertCreate from "../../components/alert/AlertCreate";
import { Box, Button, TextField } from "@mui/material";
import CategoryValidation from "../../validation/category.validation";
import functionHelper from "../../utils/functionHelper";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useCategoryEdit from "../../hooks/category/useCategoryEdit";
import { useParams } from "react-router-dom";

type Props = {
  status: string;
};

const CategoryCreate = ({ status }: Props) => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);

  let { id } = useParams<{ id: string }>();
  const {
    initialValues,
    alertErrorText,
    alertText,
    title,
    subtitle,
    image,
    setImage,
  } = useCategoryEdit(status, id ? parseInt(id) : undefined);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    if (status === "create"){
      values = functionHelper.setEmptyToUndefined(values);
      values.image = image === "#" ? undefined : image;
      (await CategoryService.create(values)) === false
        ? setAlertError(true)
        : (resetForm({ initialValues }), setAlert(true));
    } else if (status === "edit") {
      values = functionHelper.formatEditPatch(values, initialValues, image);
      if (!values) return;
      (await CategoryService.update(id ? +id : 0, values)) === false
        ? setAlertError(true)
        : setAlert(true);
    }
  };

  const handleUploadImage = (event: any) => {
    functionHelper.uploadImage(event, setImage);
  };

  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text={alertText}
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text={alertErrorText}
        severity="error"
      />
      <Header title={title} subtitle={subtitle} />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={CategoryValidation}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr)"
            >
              <TextField
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="text"
                label="Name*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              {status !== "view" && (
                <label htmlFor="image">
                  <input
                    style={{ display: "none" }}
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleUploadImage}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                  >
                    Upload image
                  </Button>
                </label>
              )}
              {image !== "#" && (
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 4" }}
                >
                  {status !== "view" && (
                    <CancelOutlinedIcon onClick={() => setImage("#")} />
                  )}

                  <img src={image} alt="preview" width="auto" height="200px" />
                </Box>
              )}
              <TextField
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {status !== "view" && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {status === "edit" ? "Update" : "create new"} category
                </Button>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CategoryCreate;
