import { useEffect, useState } from "react";
import EditionService from "../../api/services/Edition.service";
import Edition from "../../schema/edition.type";
import Collection from "../../schema/collection.type";
import CollectionService from "../../api/services/Collection.Service";
import functionHelper from "../../utils/functionHelper";
import { Box, Button, TextField } from "@mui/material";
import AlertCreate from "../../components/alert/AlertCreate";
import Header from "../../components/Header";
import { Formik } from "formik";
import EditionValidation from "../../validation/edition.validation";
import SelectReady from "../../components/SelectReady";
import { useParams } from "react-router-dom";
import useEditionEdit from "../../hooks/edition/useEditionEdit";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  status: string;
};

const EditionCreate = ({status}: Props) => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState<boolean>(false);
  const {accessToken} = useContext(AuthContext)


  let { id } = useParams<{ id: string }>();
  const {
    initialValues,
    alertErrorText,
    alertText,
    title,
    subtitle,
    collections
  } = useEditionEdit(status, id ? parseInt(id) : undefined);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    if (status === "create") {
      values = functionHelper.setEmptyToUndefined(values);
      (await EditionService.create(values, accessToken ? accessToken: '')) === false
        ? setAlertError(true)
        : (resetForm({ initialValues }), setAlert(true))
    } else if (status === "edit") {
      values = functionHelper.formatEditPatch(values, initialValues);
      if (!values) return;
      (await EditionService.update(id ? +id : 0, values,  accessToken ? accessToken: '')) === false
        ? setAlertError(true)
        : setAlert(true);
    }
  }

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
        validationSchema={EditionValidation}
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
              <SelectReady
                  status={status}
                  data={collections}
                  fieldName={"collectionId"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  touched={touched}
                  errors={errors}
                  name={"Collection"}
                  routeName={"collection"}
              />
            </Box>
            {status !== "view" && (

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
              {status === "edit" ? "Update" : "create new"} edition
              </Button>
            </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default EditionCreate;
