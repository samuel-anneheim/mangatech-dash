import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import Header from "../../components/Header";
import { TagValidation } from "../../validation/tag.validation";
import TagService from "../../api/services/Tag.service";
import AlertCreate from "../../components/alert/AlertCreate";
import useTagEdit from "../../hooks/tag/useTagEdit";
import { useParams } from "react-router-dom";
import Tag from "../../schema/tag.type";

type Props = {
  status: string;
};

const TagsCreate = ({ status }: Props) => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  let { id } = useParams<{ id: string }>();
  const { initialValues, alertErrorText, alertText, title, subtitle } =
    useTagEdit(status, id ? parseInt(id) : undefined);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    status !== "edit"
      ? (await TagService.create(values)) === false
        ? setAlertError(true)
        : (resetForm({ initialValues }), setAlert(true))
      : (await TagService.update(id ? +id : 0, values)) === false
        ? setAlertError(true)
        : setAlert(true);
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
        validationSchema={TagValidation}
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
            {status !== "view" && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {status === "edit" ? "Update" : "create"} new tag
                </Button>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TagsCreate;
