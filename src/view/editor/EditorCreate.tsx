import { useContext, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import EditorService from "../../api/services/Editor.service";
import { Box, Button, TextField } from "@mui/material";
import AlertCreate from "../../components/alert/AlertCreate";
import Header from "../../components/Header";
import { Formik } from "formik";
import EditorValidation from "../../validation/editor.validation";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useParams } from "react-router-dom";
import useEditorEdit from "../../hooks/editor/useEditorEdit";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  status: string;
};

const EditorCreate = ({ status }: Props) => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const {accessToken} = useContext(AuthContext);

  let { id } = useParams<{ id: string }>();
  const {
    initialValues,
    alertErrorText,
    alertText,
    title,
    subtitle,
    logo,
    setLogo,
  } = useEditorEdit(status, id ? parseInt(id) : undefined);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    if (status === "create") {
      values = functionHelper.setEmptyToUndefined(values);
      values.logo = logo === "#" ? undefined : logo;
      (await EditorService.create(values, accessToken ? accessToken : '')) === false
        ? setAlertError(true)
        : (resetForm({ initialValues }), setAlert(true), setLogo("#"));
    } else if (status === "edit") {
      values = functionHelper.formatEditPatch(values, initialValues, logo);
      if (!values) return;
      (await EditorService.update(id ? +id : 0, values, accessToken ? accessToken : '')) === false
        ? setAlertError(true)
        : setAlert(true);
    }
  };

  const handleUploadLogo = (event: any) => {
    functionHelper.uploadImage(event, setLogo);
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
        validationSchema={EditorValidation}
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
                <label htmlFor="logo">
                  <input
                    style={{ display: "none" }}
                    id="logo"
                    name="logo"
                    type="file"
                    onChange={handleUploadLogo}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                  >
                    Upload Logo
                  </Button>
                </label>
              )}
              {logo !== "#" && (
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 4" }}
                >
                  {status !== "view" && (
                    <CancelOutlinedIcon onClick={() => setLogo("#")} />
                  )}
                  <img src={logo} alt="preview" width="auto" height="200px" />
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
              <TextField
                disabled={status === "view"}
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
            {status !== "view" && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {status === "edit" ? "Update" : "create new"} editor
                </Button>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditorCreate;
