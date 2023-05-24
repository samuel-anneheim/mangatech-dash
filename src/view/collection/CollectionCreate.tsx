import { useContext, useEffect, useState } from "react";
import CollectionService from "../../api/services/Collection.Service";
import functionHelper from "../../utils/functionHelper";
import AlertCreate from "../../components/alert/AlertCreate";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  Switch,
  TextField,
  MenuItem,
  Chip,
  Fab,
} from "@mui/material";
import Header from "../../components/Header";
import { Formik } from "formik";
import CollectionValidation from "../../validation/collection.valdiation";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Tag from "../../schema/tag.type";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SelectReady from "../../components/SelectReady";
import { Link, useParams } from "react-router-dom";
import useCollectionEdit from "../../hooks/collection/useCollectionEdit";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  status: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CollectionCreate = ({ status }: Props) => {
  const [alert, setAlert] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<boolean>(false);
  const {accessToken} = useContext(AuthContext);

  let { id } = useParams<{ id: string }>();
  const {
    alertErrorText,
    alertText,
    initialValues,
    title,
    subtitle,
    image,
    setImage,
    editor,
    category,
    author,
    tags,
  } = useCollectionEdit(status, id ? parseInt(id) : undefined);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    if (status === "create") {
      values = functionHelper.setEmptyToUndefined(values);
      values.image = image === "#" ? undefined : image;
      values.createDate = dayjs(new Date()).format("YYYY-MM-DD");
      if (values.releaseDate) {
        values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
      }
      (await CollectionService.create(values, accessToken ? accessToken : '')) === false
        ? (setAlertError(true),
          (values.releaseDate = ""),
          (values.createDate = ""))
        : (resetForm({ initialValues }), setAlert(true));
    } else if (status === "edit") {
      values = functionHelper.formatEditPatch(values, initialValues, image);
      if (!values) return;
      if (values.releaseDate) {
        values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
      }
      if (values.tagsId) {
        values.tags = values.tagsId.map((tag: Tag) => tag.id);
      }
      (await CollectionService.update(id ? +id : 0, values, accessToken ? accessToken : '')) === false
        ? setAlertError(true)
        : setAlert(true);
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
        validationSchema={CollectionValidation}
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
                label="Title*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
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
              <TextField
                disabled={status === "view"}
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
              <SelectReady
                status={status}
                data={author}
                fieldName={"authorId"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                name={"Author"}
                routeName={"author"}
              />
              <SelectReady
                status={status}
                data={editor}
                fieldName={"editorId"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                name={"Editor"}
                routeName={"editor"}
              />
              <SelectReady
                data={category}
                status={status}
                fieldName={"categoryId"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                name={"Category"}
                routeName={"category"}
              />
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                fullWidth
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box width="85%">
                    <InputLabel id="demo-multiple-chip-label" variant="filled">
                      Tags
                    </InputLabel>
                    <Select
                      fullWidth
                      disabled={status === "view"}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      name="tagsId"
                      label="Tags"
                      variant="filled"
                      multiple
                      value={values.tagsId}
                      onChange={handleChange}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, width: "100%"}}
                        >
                          {selected.map((value) => {
                            const tag = tags.filter(
                              (tag: Tag) => tag.id == value
                            );
                            const tagName = tag[0].name;
                            return <Chip key={value} label={tagName} />;
                          })}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {tags.map((tag) => (
                        <MenuItem key={tag.name} value={tag.id}>
                          {tag.name}
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
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 2" }}
              >
                <FormGroup sx={{ width: "40%" }}>
                  <Switch
                    disabled={status === "view"}
                    checked={values.isFinish}
                    onChange={handleChange}
                    name="isFinish"
                    inputProps={{ "aria-label": "controlled" }}
                    color="secondary"
                  />
                  <label>Is finish</label>
                </FormGroup>
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
            </Box>
            {status !== "view" && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {status === "edit" ? "Update" : "create new"} collection
                </Button>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CollectionCreate;
