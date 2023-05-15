import { useEffect, useState } from "react";
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
import EditionService from "../../api/services/Edition.service";
import CollectionService from "../../api/services/Collection.Service";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Collection from "../../schema/collection.type";
import Edition from "../../schema/edition.type";

const initialValues = {
  title: "",
  number: 0,
  releaseDate: "",
  image: "#",
  resume: "",
  nbrPages: 0,
  price: 0,
  visibility: false,
  editionId: 0,

  //Not used in form but send to API (is required)
  createDate: dayjs(new Date()).format("YYYY-MM-DD"),
  followNumber: 0,
};

const VolumeCreate = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [image, setImage] = useState("#");
  const [collection, setCollection] = useState<Collection[]>([]);
  const [collectionId, setCollectionId] = useState<number>(0);
  const [editionList, setEditionList] = useState<Edition[]>([]);
  const [editionId, setEditionId] = useState<number>(0);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    values = functionHelper.setEmptyToUndefined(values);
    values.image = image === "#" ? undefined : image;
    values.image = image ? image : undefined;
    values.editionId = editionId ? editionId : undefined;
    if (values.releaseDate) {
      values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
    }
    (await VolumeService.create(values, setAlert)) === false
      ? setAlertError(true)
      : (resetForm({ initialValues }), setAlert(true));
  };

  useEffect(() => {
    CollectionService.list().then((value) => setCollection(value));
  }, []);

  const handleChangeCollectionId = async (event: any) => {
    const value = event.target.value;
    setCollectionId(value);
    setEditionId(0);
    if (value !== 0) {
      await EditionService.getWhereCollectionId(value).then((value) =>
        setEditionList(value)
      );
    } else {
      setEditionList([]);
    }
  };

  const handleUploadImage = (event: any) => {
    functionHelper.uploadImage(event, setImage);
  };
  return (
    <Box m="20px">
      <AlertCreate
        alert={alert}
        setAlert={setAlert}
        text="Volume created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Volume not created"
        severity="error"
      />
      <Header title="CREATE VOLUME" subtitle="Create a new volume" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={VolumeValidation}
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
                    checked={values.visibility}
                    onChange={handleChange}
                    name="visibility"
                    inputProps={{ "aria-label": "controlled" }}
                    color="secondary"
                  />
                  <label>Visibility</label>
                </FormGroup>
              </Box>
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
                  <CancelOutlinedIcon onClick={() => setImage("#")} />
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
                  <Box m={0.2}>
                    <Link to={`/collection/create`}>
                      <Fab color="secondary" aria-label="add" size="small">
                        <AddOutlinedIcon />
                      </Fab>
                    </Link>
                  </Box>
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
                    <Box m={0.2}>
                      <Link to={`/edition/create`}>
                        <Fab color="secondary" aria-label="add" size="small">
                          <AddOutlinedIcon />
                        </Fab>
                      </Link>
                    </Box>
                  </Box>
                </FormControl>
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new Volume
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default VolumeCreate;
