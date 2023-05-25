import { useContext, useState } from "react";
import useCollectionList from "../../hooks/collection/useCollectionList";
import CollectionService from "../../api/services/Collection.Service";
import Collection from "../../schema/collection.type";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import ActionsBlock from "../../components/ActionsBlock";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import ListView from "../../components/ListView";
import { AuthContext } from "../../context/AuthContext";
import AlertCreate from "../../components/alert/AlertCreate";

const CollectionList = () => {
  const { data, loadData, setData } = useCollectionList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");
  const [alertError, setAlertError] = useState(false);
  const { accessToken } = useContext(AuthContext);

  const handleDelete = async () => {
    const newCollections = data.filter(
      (collection: Collection) => collection.id !== idDelete
    );
    (await CollectionService.delete(
      idDelete,
      accessToken ? accessToken : ""
    )) === false
      ? setAlertError(true)
      : (setSuccessDelete(true),
        setData(newCollections),
        setTimeout(() => {
          setSuccessDelete(false);
        }, 15000)); //15sec
  };

  const CollectionDataGrid: GridColDef<Collection>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "isFinish",
      headerName: "Is Finish",
      flex: 1,
      type: "boolean",
    },
    {
      field: "visibility",
      headerName: "Visibility",
      flex: 1,
      type: "boolean",
    },
    {
      field: "followNumber",
      headerName: "Follow Number",
      flex: 1,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }: any) => {
        return (
          <ActionsBlock
            id={row.id}
            name={row.title}
            route="collection"
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
      <AlertCreate
        alert={alertError}
        setAlert={setAlertError}
        text="Error: The collection is not deleted because hi have a foreign key or internal server error."
        severity="error"
      />
      <DeleteAlert
        collectionName="collection"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess
        collectionName="collection"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        gridCol={CollectionDataGrid}
        loadData={loadData}
        subtitle="List of collections"
        route="collection"
        title="COLLECTION"
      />
    </Box>
  );
};

export default CollectionList;
