import { useContext, useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import dayjs from "dayjs";
import VolumeService from "../../api/services/Volume.Service";
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import AlertCreate from "../../components/alert/AlertCreate";
import Header from "../../components/Header";
import { Formik } from "formik";
import { VolumeValidation } from "../../validation/volume.validation";
import { DatePicker } from "@mui/x-date-pickers";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link, useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Collection from "../../schema/collection.type";
import Edition from "../../schema/edition.type";
import useVolumeEdit from "../../hooks/volume/useVolumeEdit";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  status: string;
};

const VolumeCreate = ({ status }: Props) => {
  let { id } = useParams<{ id: string }>();
  const {
    initialValues,
    alertErrorText,
    alertText,
    title,
    subtitle,
    collection,
    editionList,
    setEditionId,
    handleChangeCollectionId,
    collectionId,
    editionId,
    image,
    setImage,
    alert,
    alertError,
    setAlert,
    setAlertError,
    handleFormSubmit,
  } = useVolumeEdit(status, id ? parseInt(id) : undefined);
  const {accessToken} = useContext(AuthContext);

  const handleUploadImage = (event: any) => {
    functionHelper.uploadImage(event, setImage, accessToken ? accessToken : '');
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
        validationSchema={VolumeValidation}
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
                fullWidth
                disabled={status === "view"}
                variant="filled"
                type="text"
                label="Title*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                disabled={status === "view"}
                variant="filled"
                type="number"
                label="Number*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.number}
                name="number"
                error={!!touched.number && !!errors.number}
                helperText={touched.number && errors.number}
                sx={{ gridColumn: "span 2" }}
              />
              <DatePicker
                disabled={status === "view"}
                label="Release Date"
                onChange={(value) => setFieldValue("releaseDate", value, true)}
                value={values.releaseDate}
                format="DD-MM-YYYY"
                sx={{ gridColumn: "span 2" }}
                slotProps={{
                  textField: {
                    variant: "filled",
                    fullWidth: true,
                    onBlur: handleBlur,
                    name: "releaseDate",
                    error: Boolean(touched.releaseDate && errors.releaseDate),
                    helperText: touched.releaseDate && errors.releaseDate,
                  },
                }}
              />
              <TextField
                fullWidth
                disabled={status === "view"}
                variant="filled"
                type="number"
                label="Number of pages"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nbrPages}
                name="nbrPages"
                error={!!touched.nbrPages && !!errors.nbrPages}
                helperText={touched.nbrPages && errors.nbrPages}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                disabled={status === "view"}
                variant="filled"
                type="text"
                label="Resume"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.resume}
                name="resume"
                error={!!touched.resume && !!errors.resume}
                helperText={touched.resume && errors.resume}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                disabled={status === "view"}
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 2" }}
              >
                <FormGroup>
                  <Switch
                    disabled={status === "view"}
                    checked={values.visibility}
                    onChange={handleChange}
                    name="visibility"
                    inputProps={{ "aria-label": "controlled" }}
                    color="secondary"
                  />
                  <label>Visibility</label>
                </FormGroup>
              </Box>
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
                    Upload image
                  </Button>
                </label>
              )}
              {image !== "#" && (
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gridColumn: "span 4" }}
                >
                  {status !== "view" && (
                    <CancelOutlinedIcon onClick={() => setImage("#")} />
                  )}
                    <img src={image} alt="preview" width="auto" height="200px" />
                    </Box>
              )}
              <FormControl
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 4" }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box width="85%">
                    <InputLabel>Collection</InputLabel>
                    <Select
                      disabled={status === "view"}
                      value={collectionId}
                      fullWidth
                      onChange={handleChangeCollectionId}
                      name="Collection"
                      onBlur={handleBlur}
                    >
                      <MenuItem value={0} sx={{ height: "24px" }}></MenuItem>
                      {collection.map((el: Collection) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  {status !== "view" && (
                    <Box m={0.2}>
                      <Link to={`/collection/create`}>
                        <Fab color="secondary" aria-label="add" size="small">
                          <AddOutlinedIcon />
                        </Fab>
                      </Link>
                    </Box>
                  )}
                </Box>
              </FormControl>
              {!!collectionId && (
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{ gridColumn: "span 4" }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box width="85%">
                      <InputLabel>Edition</InputLabel>
                      <Select
                        disabled={status === "view"}
                        value={editionId}
                        fullWidth
                        onChange={(e: any) => setEditionId(e.target.value)}
                        name="Edition"
                        onBlur={handleBlur}
                      >
                        <MenuItem value={0} sx={{ height: "24px" }}></MenuItem>
                        {editionList.map((el: Edition) => (
                          <MenuItem key={el.id} value={el.id}>
                            {el.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    {status !== "view" && (
                      <Box m={0.2}>
                        <Link to={`/edition/create`}>
                          <Fab color="secondary" aria-label="add" size="small">
                            <AddOutlinedIcon />
                          </Fab>
                        </Link>
                      </Box>
                    )}
                  </Box>
                </FormControl>
              )}
            </Box>
            {status !== "view" && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {status === "edit" ? "Update" : "create new"} volume
                </Button>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default VolumeCreate;
