import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import Header from "../../components/Header";
import { TagValidation } from "../../validation/tag.validation";
import TagService from "../../api/services/Tag.service";
import AlertCreate from "../../components/alert/AlertCreate";

const initialValues = {
  name: "",
};

const TagsCreate = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const handleFormSubmit = async (values: any, resetForm: any) => {
    console.log(values);
    (await TagService.create(values)) === false
      ? setAlertError(true)
      : (resetForm({ initialValues }), setAlert(true));
  };

  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text="Tag created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Tag not created"
        severity="error"
      />
      <Header title="CREATE TAG" subtitle="Create a new tag" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={TagValidation}
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
                label="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new tag
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TagsCreate;
