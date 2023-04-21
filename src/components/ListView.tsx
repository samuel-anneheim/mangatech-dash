import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import overloadStyleDatagrid from "../utils/constant/overloadStyleDatagrid.const";
import Header from "./Header";

type Props = {
  data: never[];
  loadData: boolean;
  gridCol: GridColDef<any>[];
  title: string;
  subtitle: string;
  route: string; 
}

const ListView = ({data, loadData, gridCol, title, subtitle, route}: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (loadData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={subtitle} />
        <Box>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            component={Link}
            to={`/${route}/create`}
          >
            + NEW
          </Button>
        </Box>
      </Box>
      <Box m="20px 0 0 0" width="100%" height="75vh" sx={overloadStyleDatagrid(colors)}>
        <DataGrid
          rows={data}
          columns={gridCol}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ListView;
