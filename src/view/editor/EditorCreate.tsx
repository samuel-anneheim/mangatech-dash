import { useState } from "react";
import functionHelper from "../../utils/functionHelper";
import EditorService from "../../api/services/Editor.service";
import { Box, Button, TextField } from "@mui/material";
import AlertCreate from "../../components/alert/AlertCreate";
import Header from "../../components/Header";
import { Formik } from "formik";
import EditorValidation from "../../validation/editor.validation";

const initialValues = {
  name: "",
  logo: "",
  description: "",
  officialWebsite: "",
};

const EditorCreate = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const handleFormSubmit = async (values: any, resetForm: any) => {
    values = functionHelper.setEmptyToUndefined(values);
    console.log(values);
    (await EditorService.create(values)) === false
      ? setAlertError(true)
      : (resetForm({ initialValues }), setAlert(true));
  };

  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text="Editor created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Editor not created"
        severity="error"
      />
      <Header title="CREATE EDITOR" subtitle="Create a new editor" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={EditorValidation}
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
                label="Logo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.logo}
                name="logo"
                error={!!touched.logo && !!errors.logo}
                helperText={touched.logo && errors.logo}
                sx={{ gridColumn: "span 4" }}
              />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Official Website"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.officialWebsite}
                name="officialWebsite"
                error={!!touched.officialWebsite && !!errors.officialWebsite}
                helperText={touched.officialWebsite && errors.officialWebsite}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new editor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditorCreate;
