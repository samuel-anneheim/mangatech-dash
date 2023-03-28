import { GridColDef } from "@mui/x-data-grid";
import TagsType from "./tags.type";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DeleteOutline, EditOutlined, Visibility } from "@mui/icons-material";

const TagsDatagrid: GridColDef<TagsType, any, any>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "collectionsCount",
    headerName: "Collection count",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex:1,
    renderCell: ({ row: { id } }: any) => {
      return( 
      <Box display="flex" justifyContent="center">
        <Button><Visibility /></Button>
        <Button><DeleteOutline /></Button>
        <Button><EditOutlined /></Button>
      </Box>
    )
    },
  },
];

export default TagsDatagrid;
