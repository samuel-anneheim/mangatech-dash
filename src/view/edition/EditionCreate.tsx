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

const initialValues = {
  name: "",
  collectionId: 0,
}

const EditionCreate = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState<boolean>(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    CollectionService.list().then((data) => setCollections(data));
    console.log(collections);
    
  }, []);
  
  const handleFormSubmit = async (values: any, resetForm: any) => {
    values = functionHelper.setEmptyToUndefined(values);
    console.log(values);
    
    (await EditionService.create(values)) === false
      ? setAlertError(true)
      : (resetForm({ initialValues }), setAlert(true))
  }

  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text="Edition created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Edition not created"
        severity="error"
      />
      <Header title="CREATE EDITION" subtitle="Create a new edition" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={EditionValidation}
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
              <SelectReady
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new Edition
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default EditionCreate;
