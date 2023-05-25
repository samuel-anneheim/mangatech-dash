import { useContext, useState } from "react";
import useEditionList from "../../hooks/edition/useEditionList";
import Edition from "../../schema/edition.type";
import EditionService from "../../api/services/Edition.service";
import { GridColDef } from "@mui/x-data-grid";
import ActionsBlock from "../../components/ActionsBlock";
import { Box } from "@mui/material";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import ListView from "../../components/ListView";
import { AuthContext } from "../../context/AuthContext";
import AlertCreate from "../../components/alert/AlertCreate";

const EditionList = () => {
  const { data, loadData, setData } = useEditionList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");
  const [alertError, setAlertError] = useState(false);
  const { accessToken } = useContext(AuthContext);

  const handleDelete = async () => {
    const newEditions = data.filter(
      (edition: Edition) => edition.id !== idDelete
    );
    (await EditionService.delete(idDelete, accessToken ? accessToken : "")) ===
    false
      ? setAlertError(true)
      : (setSuccessDelete(true),
        setData(newEditions),
        setTimeout(() => {
          setSuccessDelete(false);
        }, 15000)); //15sec
  };

  const EditionDataGrid: GridColDef<Edition>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "collection",
      headerName: "Collection",
      flex: 1,
      renderCell: ({ row }: any) => {
        return <p>{row.collection?.title}</p>;
      },
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
            route="edition"
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
        text="Error: The edition is not deleted because hi have a foreign key or internal server error."
        severity="error"
      />
      <DeleteAlert
        collectionName="edition"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess
        collectionName="edition"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        gridCol={EditionDataGrid}
        loadData={loadData}
        subtitle="List of editions"
        route="edition"
        title="EDITION"
      />
    </Box>
  );
};

export default EditionList;
