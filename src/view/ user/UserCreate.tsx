import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../../components/Header";
import genderSelect from "../../utils/constant/genderSelect.const";
import AlertCreate from "../../components/alert/AlertCreate";
import functionHelper from "../../utils/functionHelper";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useParams } from "react-router-dom";
import useUserEdit from "../../hooks/user/useUserEdit";
import { UserValidation } from "../../validation/user.validation";
import roleSelect from "../../utils/constant/roleSelect.const";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

type Props = {
  status: string;
};

const UserCreate = ({ status }: Props) => {
  let { id } = useParams<{ id: string }>();
  const {
    initialValues,
    alertErrorText,
    alertText,
    title,
    subtitle,
    picture,
    setPicture,
    alert,
    setAlert,
    alertError,
    setAlertError,
    handleFormSubmit,
  } = useUserEdit(status, id ? parseInt(id) : undefined);

  const {accessToken} = useContext(AuthContext);



  const handleUploadImage = (event: any) => {
    functionHelper.uploadImage(event, setPicture, accessToken ? accessToken : '');
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
        initialValues={{...initialValues}}
        validationSchema={UserValidation}
        enableReinitialize
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
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="text"
                label="Email*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="password"
                label="Password*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="text"
                label="Surname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.surname}
                name="surname"
                error={!!touched.surname && !!errors.surname}
                helperText={touched.surname && errors.surname}
                sx={{ gridColumn: "span 2" }}
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
                    Upload picture
                  </Button>
                </label>
              )}
              {picture !== "#" && (
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 4" }}
                >
                  {status !== "view" && (
                    <CancelOutlinedIcon onClick={() => setPicture("#")} />
                  )}
                  <img src={picture} alt="preview" width="auto" height="200px" />
                </Box>
              )}
              <TextField
                disabled={status === "view"}
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
              <TextField
                disabled={status === "view"}
                fullWidth
                select
                variant="filled"
                type="text"
                label="Role*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 2" }}
              >
                {roleSelect.map((e) => (
                  <MenuItem key={e.value} value={e.value}>
                    {e.label}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                disabled={status === "view"}
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
            {status !== "view" && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {status === "edit" ? "Update" : "create new"} author
                </Button>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserCreate;
