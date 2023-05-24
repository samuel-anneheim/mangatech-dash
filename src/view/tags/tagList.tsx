import { GridColDef } from "@mui/x-data-grid";
import ActionsBlock from "../../components/ActionsBlock";
import ListView from "../../components/ListView";
import Tag from "../../schema/tag.type";
import useTagList from "../../hooks/tag/useTagList";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import TagService from "../../api/services/Tag.service";
import { AuthContext } from "../../context/AuthContext";

const TagList = () => {
  const { data, loadData, setData } = useTagList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");
  const {accessToken} = useContext(AuthContext);
  

  const handleDelete = async () => {
    const newTags = data.filter((tag: Tag) => tag.id !== idDelete);
    await TagService.delete(idDelete, accessToken ? accessToken : '');
    setSuccessDelete(true);
    setData(newTags);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000); //15sec
  };

  const TagsDatagrid: GridColDef<Tag>[] = [
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
      flex: 0.5,
      renderCell: ({ row }: any) => {
        return (
          <ActionsBlock
            id={row.id}
            name={row.name}
            route="tag"
            setAlert={setAlertWarn}
            setNameDelete={setNameDelete}
            setIdDelete={setIdDelete}
          />
        );
      },
    },
  ];

  return (
    <Box>
      <DeleteAlert
        collectionName="tag"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess 
        collectionName="tag"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        loadData={loadData}
        gridCol={TagsDatagrid}
        title={"TAG"}
        subtitle={"List of tags"}
        route={"tag"}
      />
    </Box>
  );
};

export default TagList;
