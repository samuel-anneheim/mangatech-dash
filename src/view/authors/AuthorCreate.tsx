import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../../components/Header";
import { AuthorValidation } from "../../validation/author.validation";
import genderSelect from "../../utils/constant/genderSelect.const";
import AuthorService from "../../api/services/Author.service";
import AlertCreate from "../../components/alert/AlertCreate";
import dayjs from "dayjs";
import functionHelper from "../../utils/functionHelper";

const initialValues = {
  name: "",
  surname: "",
  gender: "",
  image: "",
  biography: "",
  dateOfBirth: "",
};

const AuthorCreate = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [image, setImage] = useState("#");
  const handleFormSubmit = async (values: any, resetForm: any) => {
    values = functionHelper.setEmptyToUndefined(values);
    values.image = image ? image : undefined;
    if (values.dateOfBirth) {
      values.dateOfBirth = dayjs(values.dateOfBirth).format("YYYY-MM-DD");
    }
    (await AuthorService.create(values, setAlert)) === false
      ? setAlertError(true)
      : (resetForm({ initialValues }), setAlert(true));
  };

  const handleUploadImage = (event: any) => {
    functionHelper.uploadImage(event, setImage);
  };

  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text="Author created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Author not created"
        severity="error"
      />
      <Header title="CREATE AUTHOR" subtitle="Create a new author" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={AuthorValidation}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Surname*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.surname}
                name="surname"
                error={!!touched.surname && !!errors.surname}
                helperText={touched.surname && errors.surname}
                sx={{ gridColumn: "span 2" }}
              />
              <label htmlFor="image">
                <input
                  style={{ display: "none" }}
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleUploadImage}
                />
                <Button color="secondary" variant="contained" component="span">
                  Upload image
                </Button>
              </label>
              {image !== "#" && (
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 4" }}
                >
                  <img src={image} alt="preview" width="auto" height="200px" />
                </Box>
              )}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Biography"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.biography}
                name="biography"
                error={!!touched.biography && !!errors.biography}
                helperText={touched.biography && errors.biography}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              >
                {genderSelect.map((e) => (
                  <MenuItem key={e.value} value={e.value}>
                    {e.label}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Date Of Birth"
                onChange={(value) => setFieldValue("dateOfBirth", value, true)}
                value={values.dateOfBirth}
                format="DD-MM-YYYY"
                sx={{ gridColumn: "span 2" }}
                slotProps={{
                  textField: {
                    variant: "filled",
                    fullWidth: true,
                    onBlur: handleBlur,
                    name: "dateOfbirth",
                    error: Boolean(touched.dateOfBirth && errors.dateOfBirth),
                    helperText: touched.dateOfBirth && errors.dateOfBirth,
                  },
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new author
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthorCreate;
