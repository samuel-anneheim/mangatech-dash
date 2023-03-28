import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import TagsDatagrid from "./schema/tags.datagrid";
import overloadStyleDatagrid from "../../utils/constant/overloadStyleDatagrid.const";
import { Link } from "react-router-dom";
import api from "../../config/axiosConfig";
import { useEffect, useState } from "react";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loadData, setLoadData] = useState(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getTags = async () => {
    return await api
      .get(`/tag/countCollection`)
      .then((response) => {
        const data = response.data;
        setTags(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTags();
    setLoadData(false);
  }, [tags]);

  if (loadData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      {loadData}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TAGS" subtitle="List of tags" />
        <Box>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            component={Link}
            to="/tags/create"
          >
            + NEW
          </Button>
        </Box>
      </Box>
      <Box m="20px 0 0 0" height="75vh" sx={overloadStyleDatagrid(colors)}>
        <DataGrid
          rows={tags}
          columns={TagsDatagrid}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default TagList;
