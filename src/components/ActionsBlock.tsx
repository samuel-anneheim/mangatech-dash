import { DeleteOutline, EditOutlined, Visibility } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  route: string;
  id: number;
  name: string;
  setAlert?: any;
  setIdDelete?: any;
  setNameDelete?: any;
};

const ActionsBlock = ({ route, id, name, setAlert, setIdDelete, setNameDelete }: Props) => {
  return (
    <Box display="flex" justifyContent="space-around">
      <Box m={0.2}>
        <Link to={`/${route}/${id}`}>
          <Fab color="primary" aria-label="add" size="small">
            <Visibility color="secondary" />
          </Fab>
        </Link>
      </Box>
      <Box m={0.2}>
        <Link to={`/${route}/edit/${id}`}>
          <Fab color="primary" aria-label="add" size="small">
            <EditOutlined color="warning" />
          </Fab>
        </Link>
      </Box>
      <Box m={0.2}>
        <Fab
          aria-label="add"
          size="small"
          color="primary"
          onClick={() => {setAlert(true), setNameDelete(name), setIdDelete(id)}}
        >
          <DeleteOutline color="error" />
        </Fab>
      </Box>
    </Box>
  );
};

export default ActionsBlock;
