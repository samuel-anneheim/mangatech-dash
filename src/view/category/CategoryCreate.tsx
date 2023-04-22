import { useState } from "react";
import CategoryService from "../../api/services/Category.service";
import { Formik } from "formik";
import Header from "../../components/Header";
import AlertCreate from "../../components/alert/AlertCreate";
import { Box, Button, TextField } from "@mui/material";
import CategoryValidation from "../../validation/category.validation";
import functionHelper from "../../utils/functionHelper";

const initialValues = {
  name: "",
  description: "",
  image: "",
};

const CategoryCreate = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const handleFormSubmit = async (values: any, resetForm: any) => {
    values = functionHelper.setEmptyToUndefined(values);
    console.log(values);
    (await CategoryService.create(values)) === false
      ? setAlertError(true)
      : (resetForm({ initialValues }), setAlert(true));
  };

  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text="Category created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Category not created"
        severity="error"
      />
      <Header title="CREATE CATEGORY" subtitle="Create a new category" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={CategoryValidation}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Image"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.image}
                name="image"
                error={!!touched.image && !!errors.image}
                helperText={touched.image && errors.image}
                sx={{ gridColumn: "span 4" }}
              />
              {values.image && (
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 4" }}
                >
                  <img
                    src={values.image}
                    alt="preview"
                    width="auto"
                    height="200px"
                  />
                </Box>
              )}
              <TextField
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CategoryCreate;
