import { Alert, Box, Button, Collapse, IconButton, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Header from "../../components/Header";
import api from "../../config/axiosConfig";
import TagsType from "./schema/tags.type";
import CloseIcon from '@mui/icons-material/Close';

const initialValues = {
  name: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
});

const TagsCreate = () => {
  const [alert, setAlert] = useState(false);
  const handleFormSubmit = (values: any, resetForm:any) => {
    console.log(values);
    sendTags(values);
    resetForm({initialValues});
    
  };

  const sendTags = async (data: TagsType) => {
    return await api
      .post(
        `/tag`, data
      )
      .then(() => {
        setAlert(true)
        return (<Alert severity="success">This is a success alert — check it out!</Alert>)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box m="20px">
      <Collapse in={alert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
      <Header title="CREATE TAG" subtitle="Create a new tag" />
      <Formik
        onSubmit={(values, {resetForm}) => {handleFormSubmit(values, resetForm)}}
        initialValues={initialValues}
        validationSchema={userSchema}
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
