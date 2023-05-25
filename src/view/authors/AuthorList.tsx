import { GridColDef } from "@mui/x-data-grid";
import { useContext, useState } from "react";

import ActionsBlock from "../../components/ActionsBlock";
import ListView from "../../components/ListView";
import Author from "../../schema/author.type";
import useAuthorList from "../../hooks/author/useAuthorList";
import { Box } from "@mui/material";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import AuthorService from "../../api/services/Author.service";
import { AuthContext } from "../../context/AuthContext";
import AlertCreate from "../../components/alert/AlertCreate";

const AuthorList = () => {
  const { data, loadData, setData } = useAuthorList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");
  const [alertError, setAlertError] = useState(false);
  const {accessToken} = useContext(AuthContext);

  const handleDelete = async() => {
    const newAuthors = data.filter((author: Author) => author.id !== idDelete);
    await AuthorService.delete(idDelete, accessToken ? accessToken : '') === false
    ? setAlertError(true)
    :(setSuccessDelete(true),
    setData(newAuthors),
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000)) //15sec
  };

  const TagsDatagrid: GridColDef<Author>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "surname",
      headerName: "Surname",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
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
            route="author"
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
        text="Error: The author is not deleted because hi have a foreign key or internal server error."
        severity="error"
      />
      <DeleteAlert
        collectionName="author"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess
        collectionName="author"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        loadData={loadData}
        gridCol={TagsDatagrid}
        title={"AUTHOR"}
        subtitle={"List of authors"}
        route={"author"}
      />
    </Box>
  );
};

export default AuthorList;
