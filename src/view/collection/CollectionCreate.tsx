import { useEffect, useState } from "react";
import CollectionService from "../../api/services/Collection.Service";
import functionHelper from "../../utils/functionHelper";
import AlertCreate from "../../components/alert/AlertCreate";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  NativeSelect,
  Select,
  Switch,
  TextField,
  MenuItem,
  OutlinedInput,
  Chip,
  Fab,
} from "@mui/material";
import Header from "../../components/Header";
import { Formik } from "formik";
import CollectionValidation from "../../validation/collection.valdiation";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import AuthorService from "../../api/services/Author.service";
import CategoryService from "../../api/services/Category.service";
import Editor from "../../schema/editor.type";
import EditorService from "../../api/services/Editor.service";
import Category from "../../schema/category.type";
import Author from "../../schema/author.type";
import Tag from "../../schema/tag.type";
import TagService from "../../api/services/Tag.service";
import Collection from "../../schema/collection.type";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SelectReady from "../../components/SelectReady";

//Valeur initiale du formulaire de création de collection grace au type Collection
const initialValues = {
  title: "",
  image: "",
  releaseDate: "",
  resume: "",
  isFinish: false,
  visibility: false,
  editorId: 0,
  categoryId: 0,
  authorId: 0,
  tagsId: [],

  //Not used in form but send to API (is required)
  createDate: dayjs(new Date()).format("YYYY-MM-DD"),
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

const CollectionCreate = () => {
  const [alert, setAlert] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<boolean>(false);
  const [image, setImage] = useState<string>("#");
  const [editor, setEditor] = useState<Editor[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    EditorService.list().then((data) => setEditor(data));
    CategoryService.list().then((data) => setCategory(data));
    AuthorService.list().then((data) => setAuthor(data));
    TagService.list().then((data) => setTags(data));
  }, []);

  const handleFormSubmit = async (values: any, resetForm: any) => {
    values = functionHelper.setEmptyToUndefined(values);
    values.image = image ? image : undefined;
    if (values.releaseDate) {
      values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
    }
    (await CollectionService.create(values)) === false
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
        text="Collection created succefully"
        severity="success"
      />
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Collection not created"
        severity="error"
      />
      <Header title="CREATE COLLECTION" subtitle="Create a new collection" />
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
        initialValues={initialValues}
        validationSchema={CollectionValidation}
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
                <InputLabel id="demo-multiple-chip-label" variant="filled">
                  Tags
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="tagsId"
                  label="Tags"
                  variant="filled"
                  multiple
                  value={values.tagsId}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const tag = tags.filter((tag: Tag) => tag.id == value);
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
              </FormControl>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 2" }}
              >
                <FormGroup sx={{ width: "40%" }}>
                  <Switch
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create new collection
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CollectionCreate;
