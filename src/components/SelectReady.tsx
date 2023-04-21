import { Fab, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

type Props = {
  data: any;
  fieldName: string;
  handleChange: any;
  handleBlur: any;
  values: any;
  touched: any;
  errors: any;
  name: string;
  routeName: string;
};
const SelectReady = ({
  data,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  name,
  routeName,
  fieldName,
}: Props) => {

  const stringRetuned = (el: any, name: string) => {
    if (name === "Author") {
      return `${el.name}  ${el?.surname}`;
    }
    if (name === "Collection") {
      return el.title;
    }else {
      return el.name;
    }
  }

  return (
    <FormControl variant="filled" fullWidth sx={{ gridColumn: "span 2" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="85%">
          <InputLabel>{name}</InputLabel>
          <Select
            value={values[fieldName]}
            fullWidth
            onChange={handleChange}
            name={fieldName}
            onBlur={handleBlur}
            error={!!touched[fieldName] && !!errors[fieldName]}
          >
            <MenuItem value="0" sx={{ height: "24px" }}></MenuItem>
            {data.map((el: any) => (
              <MenuItem key={el.id} value={el.id}>
                {stringRetuned(el, name)}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box m={0.2}>
          <Link to={`/${routeName}/create`}>
            <Fab color="secondary" aria-label="add" size="small">
              <AddOutlinedIcon />
            </Fab>
          </Link>
        </Box>
      </Box>
    </FormControl>
  );
};

export default SelectReady;
